<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ChatbotGeminiService;

class ChatbotGeminiController extends Controller
{
    protected $gemini;

    public function __construct(ChatbotGeminiService $gemini)
    {
        $this->gemini = $gemini;
    }

    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string'
        ]);

        $response = $this->gemini->sendMessage($request->message);

        return response()->json([
            'reply' => $response
        ]);
    }
}
