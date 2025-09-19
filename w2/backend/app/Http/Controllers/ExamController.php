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
            'userID' => $user->id,
            'score' => 0,
            'startAt' => date('Y-m-d H:i:s'),
            'endAt' => date('Y-m-d H:i:s', strtotime('+30 minutes')),
            'Duration' => 30,
            'status' => 'progressing',
        ]);

        foreach ($questions as $q) {
            ResultQuestion::create([
                'questionID' => $q->id,
                'resultID' => $result->id,
                'ansUser' => null,
            ]);
        }

        return response()->json([
            'resultID' => $result->id,
            'questions' => $questions
        ]);
    }

    public function getExam($resultID)
    {
        $result = Result::findOrFail($resultID);

        $questions = ResultQuestion::with('question')
            ->where('resultID', $resultID)
            ->orderBy('id')
            ->get()
            ->map(function ($rq) {
                return [
                    'id'      => $rq->question->id,
                    'title'   => $rq->question->title,
                    'content' => $rq->question->content,
                    'audio'   => $rq->question->audio,
                    'ansa'    => $rq->question->ansa,
                    'ansb'    => $rq->question->ansb,
                    'ansc'    => $rq->question->ansc,
                    'ansd'    => $rq->question->ansd,
                    'ansUser' => $rq->ansUser,
                ];
            });

        return response()->json([
            'id'          => $result->id,
            'user'        => $result->user,
            'score'       => $result->score,
            'submittedAt' => $result->submitted_at,
            'startAt'     => $result->startAt,
            'endAt'       => $result->endAt,
            'duration'    => $result->Duration,
            'status'      => $result->status,
            'questions'   => $questions,
        ]);
    }



    public function saveAnswer(Request $request, $resultID)
    {
        $answers = $request->input('answers');

        foreach ($answers as $item) {
            ResultQuestion::where('resultID', $resultID)
                ->where('questionID', $item['questionID'])
                ->update(['ansUser' => $item['ansUser']]);
        }

        return response()->json(['message' => 'Lưu đáp án thành công']);
    }

    public function finishExam($resultID)
    {
        $result = Result::findOrFail($resultID);

        $questions = ResultQuestion::where('resultID', $resultID)
            ->with('question')
            ->get();

        $correct = 0;
        $MandatoryPass = true;
        foreach ($questions as $q) {
            if ($q->ansUser && $q->ansUser === $q->question->ansRight) {
                $correct++;
            } else if ($q->mandatory) {
                $MandatoryPass = false;
            }
        }

        $result->score = $correct;
        $result->status = 'complete';
        $result->endAt = now();
        $result->Duration = now()->diffInMinutes($result->startAt);
        $result->save();
        $result->isPass = $correct > 28 && $MandatoryPass;

        return response()->json([
            $result
        ]);
    }

    public function listResults()
    {
        $user = Auth::user();
        $results = Result::where('userID', $user->id)->get();

        return response()->json($results);
    }

public function result($resultID)
{
    $result = Result::find($resultID);

    $resultQuestions = ResultQuestion::with('question')
        ->where('resultID', $resultID)
        ->orderBy('id')
        ->get();

    return response()->json([
        'result' => $result,
        'resultQuestions' => $resultQuestions,
    ]);
}

}
