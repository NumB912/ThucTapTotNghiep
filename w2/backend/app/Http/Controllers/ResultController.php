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

        $results = Result::where('userid', $user->id)->orderBy('status', 'asc')->get();

        return response()->json($results);
    }

    public function result($id)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(["message" => "Vui lòng đăng nhập"], 401);
        }

        $result = Result::where('id', $id)
            ->where('userid', $user->id)
            ->with(['resultQuestions.question.topic'])
            ->first();

        if (!$result) {
            return response()->json(["message" => "Không có kết quả"], 404);
        }

        $questions = $result->resultQuestions->map(function ($rq) {
            $q = $rq->question;
            return [
                'id' => $q->id,
                'title' => $q->title,
                'content' => $q->content,
                'audio' => $q->audio,
                'ansa' => $q->ansa,
                'ansb' => $q->ansb,
                'ansc' => $q->ansc,
                'ansd' => $q->ansd,
                'mandatory' => $q->mandatory,
                'pos' => $q->pos,
                'status' => $q->status,
                'topic' => $q->topic,
                'anshint' => $q->anshint,
                'ansright' => $q->ansright,
                'ansuser' => $rq->ansuser,
            ];
        });

        return response()->json([
            'result' => [
                'id' => (string) $result->id,
                'user' => $user,
                'score' => $result->score,
                'submitted_at' => $result->submitted_at,
                'start_at' => $result->start_at,
                'end_at' => $result->end_at,
                'duration' => $result->duration,
                'ispass' => $result->ispass,
                'question_quantity' => $result->question_quantity,
                'status' => $result->status,
                'questions' => $questions,
            ]
        ]);
    }
}
