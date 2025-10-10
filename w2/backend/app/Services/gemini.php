<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
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
        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json'
            ])
            ->timeout(30)
            ->retry(3, 1000)
            ->post($this->baseUrl . '?key=' . $this->apiKey, [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => "Bạn là chatbot chuyên về giao thông Việt Nam. Trả lời các câu hỏi liên quan luật giao thông. Nếu câu hỏi khác thì từ chối."],
                            ['text' => $message]
                        ]
                    ]
                ]
            ]);

            if ($response->failed()) {
                Log::error('Gemini API request failed', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                return 'Lỗi: trong quá trình thực thi vui lòng thực hiện lại lần sau';
            }

            $data = $response->json();

            return $data['candidates'][0]['content']['parts'][0]['text'] ?? 'Không có phản hồi';

        } catch (\Illuminate\Http\Client\ConnectionException $e) {
            Log::error('Gemini API connection error', [
                'message' => $e->getMessage(),
            ]);
            return 'Lỗi kết nối tới server. Vui lòng thử lại sau.';
        } catch (\Exception $e) {
            Log::error('Gemini API unexpected error', [
                'message' => $e->getMessage(),
            ]);
            return 'Đã xảy ra lỗi. Vui lòng thử lại.';
        }
    }
}
