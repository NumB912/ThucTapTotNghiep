<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Topic;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    public function index()
    {
        $result = Topic::all();
        return response()->json($result);
    }


      public function questionTopic($id)
    {
        $topic = Topic::find($id);
        if (!$topic) {
            return response()->json(['message' => 'Topic không tồn tại'], 404);
        }
        $questions = Question::with("topic")->where('topic_id', $id)->get();

        return response()->json($questions);
    }
}
