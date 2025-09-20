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
        // Lấy bài thi và user
        $result = Result::with('user')
            ->findOrFail($resultID);

        // Lấy tất cả ResultQuestion và kèm Question + Topic
        $questions = ResultQuestion::with(['question.topic'])
            ->where('resultID', $resultID)
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
                    'ansUser' => $rq->ansUser, // đáp án người dùng
                    'answer' => $rq->question->answer ?? null, // nếu muốn lưu đáp án đúng
                ];
            });

        return response()->json([
            'result' => [
                'id' => $result->id,
                'user' => $result->user,
                'score' => $result->score,
                'submittedAt' => $result->submitted_at,
                'startAt' => $result->startAt,
                'endAt' => $result->endAt,
                'duration' => $result->Duration,
                'status' => $result->status,
            ],
            'resultQuestions' => $questions,
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
        $questionQuatity = 0;
        foreach ($questions as $q) {
                   $questionQuatity++;
            if ($q->ansUser && $q->ansUser === $q->question->ansRight) {
                $correct++;
            } else if ($q->question && $q->question->mandatory) {
                $MandatoryPass = false;
            }
        }

        $result->score = $correct;
        $result->status = 'complete';
        $result->endAt = now();
        $result->Duration = now()->diffInMinutes($result->startAt);
        $result->submitted_at = now();
        $result->isPass = $correct >= 28 && $MandatoryPass;
        $result->questionQuantity = $questionQuatity;
        $result->save();

        return response()->json([
            $result
        ]);
    }

    public function Results()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(["message" => "vui lòng đăng nhập", 401]);
        }

        $results = Result::where('userID', $user->id)->get();

        return response()->json($results);
    }

public function result($id)
{
    // Lấy kết quả
    $result = Result::find($id);

    if (!$result) {
        return response()->json(['message' => 'Result không tồn tại'], 404);
    }

    // Lấy các câu hỏi kèm quan hệ question
    $resultQuestions = ResultQuestion::with('question')
        ->where('resultID', $id)
        ->orderBy('id')
        ->get();

    // Chuyển resultQuestions vào result.questions để frontend dùng trực tiếp
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
            'ansUser' => $rq->ansUser, // đáp án người dùng chọn
        ];
    });

    // Thêm vào object result
    $result->questions = $questions;

    return response()->json([
        'result' => $result
    ]);
}

}
