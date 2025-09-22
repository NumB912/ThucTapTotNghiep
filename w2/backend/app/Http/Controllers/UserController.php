<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Result;

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

}
