<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function signin(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('username', $request->username)->first();

        if (!$user) {
            return response()->json(['message' => 'Sai tên đăng nhập'], 401);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Sai mật khẩu'], 401);
        }

        $tokenResult = $user->createToken(
            'api-token',          
            ['*'],             
            now()->addDays(2)  
        );
        $tokenToClient = $tokenResult->plainTextToken;
        $expires_at = $tokenResult->accessToken->expires_at;
        return response()->json([
            'message' => 'Đăng nhập thành công',
            'user'    => $user,
            'token'   => $tokenToClient,
            'expires_at'=>$expires_at,
        ]);
    }

    public function signup(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|unique:users,username',
            'password' => 'required|string|min:6',
            'name'     => 'required|string',
            'email'    => 'required|email|unique:users,email',
        ]);

        try {
            $user = User::create([
                'username' => $validated['username'],
                'password' => Hash::make($validated['password']),
                'name'     => $validated['name'],
                'email'    => $validated['email'],
            ]);

            return response()->json([
                'message' => 'Đăng ký thành công',
                'user'    => $user,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đăng ký thất bại',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
        public function changePassword(Request $request)
    {
        $user = $request->user();

        if (!$user) {
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

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return response()->json(['message' => 'Đăng xuất thành công']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Lỗi trong quá trình đăng xuất',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
