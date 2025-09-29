<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ChatbotGeminiService
{
    protected $apiKey;
    protected $baseUrl;

    public function __construct()
    {
        $this->apiKey = env('GEMINI_API_KEY');
        $model = 'gemini-2.5-flash';
        $this->baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent";
    }

    public function sendMessage($message)
    {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json'
        ])->post($this->baseUrl . '?key=' . $this->apiKey, [
            'contents' => [
                [
                    'parts' => [
                         ['text' => "Bạn là chatbot chuyên về giao thông việt nam. Trả lời các câu hỏi liên quan luật giao thông. Nếu câu hỏi khác thì từ chối."],
                        ['text' => $message]
                    ]
                ]
            ]
        ]);

        if ($response->failed()) {
            return 'Lỗi: trong quá trình thực thi vui lòng thực hiện lại lần sau';
        }

        $data = $response->json();
        return $data['candidates'][0]['content']['parts'][0]['text'] ?? 'Không có phản hồi';
    }
}
