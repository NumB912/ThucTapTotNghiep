<?php

namespace App\Services;

use GuzzleHttp\Client;

class OpenAIService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client(['base_uri' => 'https://api.openai.com/v1/']);
    }

    public function request($method, $endpoint, $params = [])
    {
        $response = $this->client->request($method, $endpoint, [
            'headers' => [
                'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
                'Content-Type' => 'application/json',
            ],
            'json' => $params,
        ]);

        return json_decode($response->getBody(), true);
    }
}