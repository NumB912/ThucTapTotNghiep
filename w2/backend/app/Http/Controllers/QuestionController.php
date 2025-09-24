<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function index()
    {
        $questions = Question::with('topic')->get();

        return response()->json($questions);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'     => 'required|string',
            'content'   => 'nullable|string',
            'audio'     => 'nullable|string',
            'ansa'      => 'nullable|string',
            'ansb'      => 'nullable|string',
            'ansc'      => 'nullable|string',
            'ansd'      => 'nullable|string',
            'ansRight'  => 'nullable|string|max:1',
            'ansHint'   => 'nullable|string',
            'mandatory' => 'nullable',
            'pos'       => 'nullable|integer',
            'status'    => 'nullable|string|max:16',
            'topic_id'  => 'nullable|integer|exists:Topics,id'
        ]);

        $question = Question::create($validated);

        return response()->json([
            'message' => 'Tạo câu hỏi thành công',
            'question' => $question,
        ], 201);
    }

    public function show($id)
    {
        $question = Question::with('topic')->find($id);

        if (!$question) {
            return response()->json(['message' => 'Không tìm thấy câu hỏi'], 404);
        }

        return response()->json($question);
    }

    public function update(Request $request, $id)
    {
        $question = Question::find($id);

        if (!$question) {
            return response()->json(['message' => 'Không tìm thấy câu hỏi'], 404);
        }

        $question->update($request->all());

        return response()->json([
            'message' => 'Cập nhật câu hỏi thành công',
            'question' => $question,
        ]);
    }

    // Xóa câu hỏi
    public function destroy($id)
    {
        $question = Question::find($id);

        if (!$question) {
            return response()->json(['message' => 'Không tìm thấy câu hỏi'], 404);
        }

        $question->delete();

        return response()->json(['message' => 'Xóa câu hỏi thành công']);
    }
}
