<?php

namespace App\Http\Controllers;

use App\Models\Result;
use App\Models\ResultQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResultController extends Controller
{
    public function index()
    {
        $result = Result::with('user')->get();

        return response()->json($result);
    }

    public function GetResultUser()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(["message" => "vui lòng đăng nhập", 401]);
        }

        $results = Result::where('userid', $user->id)->orderBy('status','asc')->get();

        return response()->json($results);
    }

  public function result($id)
{
    $user = Auth::user();

    if (!$user) {
        return response()->json(["message" => "vui lòng đăng nhập"], 401);
    }

    $result = Result::where('id', $id)
                    ->where('userid', $user->id)
                    ->with(['questions']) // nếu muốn load quan hệ
                    ->first();

    if (!$result) {
        return response()->json(["message" => "Không có kết quả"], 404);
    }

    return response()->json([
        'result' => $result
    ]);
}
}
