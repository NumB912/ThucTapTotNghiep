<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'userName' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('userName', $request->userName)->first();

        if (!$user) {
            return response()->json(['message' => 'Sai tên đăng nhập'], 401);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Sai mật khẩu'], 401);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Đăng nhập thành công',
            'user'    => $user,
            'token'   => $token,
        ]);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'userName' => 'required|string|unique:User,userName',
            'password' => 'required|string|min:6',
            'name'     => 'required|string',
            'email'    => 'required|email|unique:User,email',
        ]);

        try {
            $user = User::create([
                'userName' => $validated['userName'],
                'password' => Hash::make($validated['password']),
                'name'     => $validated['name'],
                'email'    => $validated['email'],
                'createAt' => now(),
                'updateAt' => now(),
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
