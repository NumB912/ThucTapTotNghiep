<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Result;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
class UserController extends Controller
{
    public function index()
    {
        return response()->json(
            User::with('results')->get()
        );
    }

    public function userResults($userid)
    {
        $results = Result::with(['resultQuestions.question.topic'])
            ->where('userid', $userid)
            ->get();

        return response()->json($results);
    }

    public function update(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();
        if (!$user) return response()->json(['message' => 'Chưa đăng nhập'], 401);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        return response()->json(['success' => true, 'user' => $user]);
    }

    public function uploadAvatar(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();
        if (!$user) return response()->json(['message' => 'Chưa đăng nhập'], 401);

        $request->validate([
            'img' => 'required|image|max:2048',
        ]);

        $file = $request->file('img');
        $filename = time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('users', $filename, 'public');
        $user->img = 'http://127.0.0.1:8000/api/' . $path;
        $user->save();

        return response()->json(['success' => true, 'img' => $user->img]);
    }


    public function avatar($filename){
    $path = storage_path('app/public/users/' . $filename);

    if (!file_exists($path)) {
        return response()->json(['error' => 'File not found'], 404);
    }

    return response()->file($path);
    }


      public function changePassword(Request $request)
    {
        $user = $request->user();

        if(!$user){
            return response()->json(['errors' => 'message'], 422);
        }

        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Mật khẩu hiện tại không đúng'], 400);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Đổi mật khẩu thành công']);
    }
}
