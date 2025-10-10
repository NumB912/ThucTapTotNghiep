<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ChatbotGeminiService; // ✅ Đảm bảo dòng này đúng

class ChatbotGeminiController extends Controller
{
    protected $gemini;

    public function __construct(ChatbotGeminiService $gemini) // ✅ Đổi đúng tên
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
