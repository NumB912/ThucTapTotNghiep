<?php

namespace App\Http\Controllers;

use App\Models\Result;
use App\Models\ResultQuestion;
use Illuminate\Http\Request;

class ResultController extends Controller
{
    public function index()
    {
        $result = Result::with('user')->get();

        return response()->json($result);
    }

    public function getResultUser($id){
        $result = Result::with(['user'])->where('userID',$id);
        
        return response()->json($result);
    }


}
