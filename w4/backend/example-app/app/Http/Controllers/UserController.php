<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
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

        if($user->img){
            
        }

        $file = $request->file('img');
        $filename = time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('users', $filename, 'public');
        $user->img = 'http://127.0.0.1:8000/api/' . $path;
        $user->save();

        return response()->json(['success' => true, 'img' => $user->img]);
    }


    public function avatar($filename)
    {
        $path = storage_path('app/public/users/' . $filename);

        if (!file_exists($path)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        return response()->file($path);
    }

    public function user($id){
        $user = User::find($id);
        if(!$user){
            return response()->json(['message'=>'Lỗi không thể truy cập thông tin người dùng']);
        }

        return response()->json($user);
    }
}
