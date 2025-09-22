<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Result;
use App\Models\ResultQuestion;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ExamController extends Controller
{
    public function startExam(Request $request)
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'User chưa login'], 401);
        }

        $questions = Question::inRandomOrder()->limit(30)->get();

        $result = Result::create([
            'userid' => $user->id,
            'score' => 0,
            'start_at' => date('Y-m-d H:i:s'),
            'end_at' => date('Y-m-d H:i:s', strtotime('+30 minutes')),
            'duration' => 30,
            'status' => 'progressing',
            'ispass' => false,
            'question_quantity' => 30,
        ]);

        foreach ($questions as $q) {
            ResultQuestion::create([
                'questionid' => $q->id,
                'resultid' => $result->id,
                'ansUser' => null,
            ]);
        }

        return response()->json([
            'resultid' => $result->id,
            'questions' => $questions
        ]);
    }

    public function getExam($result_id)
    {
        $result = Result::with('user')
            ->findOrFail($result_id);

        $questions = ResultQuestion::with(['question.topic'])
            ->where('resultid', $result_id)
            ->orderBy('id')
            ->get()
            ->map(function ($rq) {
                return [
                    'id' => $rq->question->id,
                    'title' => $rq->question->title,
                    'content' => $rq->question->content,
                    'audio' => $rq->question->audio,
                    'ansa' => $rq->question->ansa,
                    'ansb' => $rq->question->ansb,
                    'ansc' => $rq->question->ansc,
                    'ansd' => $rq->question->ansd ?? null,
                    'mandatory' => $rq->question->mandatory,
                    'pos' => $rq->question->pos,
                    'status' => $rq->question->status,
                    'topic' => $rq->question->topic,
                    'ansuser' => $rq->ansuser,
                ];
            });

        return response()->json([
            'result' => [
                'id' => $result->id,
                'user' => $result->user,
                'score' => $result->score,
                'submitted_at' => $result->submitted_at,
                'start_at' => $result->start_at,
                'end_at' => $result->end_at,
                'duration' => $result->Duration,
                'status' => $result->status,
            ],
            'questions' => $questions,
        ]);
    }





    public function saveAnswer(Request $request, $resultID)
    {

        $questionId = $request->input('questionid');
        $ansuser    = $request->input('ansuser');

        $result = ResultQuestion::where('resultid', $resultID)->where('questionid', $questionId)->update(['ansuser' => strtoupper($ansuser)]);

        return response()->json($result);
    }


    public function finishExam($resultID)
    {
        $result = Result::findOrFail($resultID);

        if (!$result) {
            return response()->json(["message", "không tồn tại bài ghi"], 404);
        }

        $questions = ResultQuestion::where('resultid', $resultID)
            ->with('question')
            ->get();

        $correct = 0;
        $MandatoryPass = true;
        $questionQuatity = 0;
        foreach ($questions as $q) {
            $questionQuatity++;
            if ($q->ansuser && $q->ansuser === $q->question->ansright) {
                $correct++;
            } else if ($q->question && $q->question->mandatory) {
                $MandatoryPass = false;
            }
        }

        $result->score = $correct;
        $result->status = 'complete';
        $result->submitted_at = now();
        $result->ispass = $correct >= 28 && $MandatoryPass;
        $result->save();

        return response()->json($result);
    }

    public function result($id)
    {
        $result = Result::find($id);

        if (!$result) {
            return response()->json(['message' => 'Result không tồn tại'], 404);
        }
        $resultQuestions = ResultQuestion::with('question')
            ->where('resultID', $id)
            ->orderBy('id')
            ->get();


        $questions = $resultQuestions->map(function ($rq) {
            return [
                'id' => $rq->question->id,
                'title' => $rq->question->title,
                'content' => $rq->question->content,
                'audio' => $rq->question->audio,
                'ansa' => $rq->question->ansa,
                'ansb' => $rq->question->ansb,
                'ansc' => $rq->question->ansc,
                'ansd' => $rq->question->ansd,
                'ansRight' => $rq->question->ansRight,
                'ansUser' => $rq->ansUser,
            ];
        });

        $result->questions = $questions;

        return response()->json([
            'result' => $result
        ]);
    }
}
