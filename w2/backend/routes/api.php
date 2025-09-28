<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('/questions', [QuestionController::class, 'index']);
Route::post('/questions', [QuestionController::class, 'store']);
Route::get('/questions/{id}', [QuestionController::class, 'show']);
Route::put('/questions/{id}', [QuestionController::class, 'update']);
Route::delete('/questions/{id}', [QuestionController::class, 'destroy']);

Route::get('/results', [ResultController::class, 'index']);

Route::get('/topics', [TopicController::class, 'index']);
Route::get('/topic/{id}/question', [TopicController::class, 'questionTopic']);

Route::get('/users', [UserController::class, 'index']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/public/images/{filename}', [ImageController::class, 'show']);
Route::get('/users/{filename}', [UserController::class, 'avatar']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::put('/user', [UserController::class, 'update']);
    Route::post('/user/changepassword', [UserController::class, 'changepassword']);

    Route::post('/user/avatar', [UserController::class, 'uploadAvatar']);

    Route::post('/exam/start', [ExamController::class, 'startExam']);
    Route::get('/exam/{resultID}', [ExamController::class, 'getExam']);
    Route::post('/exam/{resultID}/answer', [ExamController::class, 'saveAnswer']);
    Route::post('/exam/{resultID}/finish', [ExamController::class, 'finishExam']);

    Route::get('/results', [ResultController::class, 'getResultUser']);
    Route::get('/results/{id}', [ResultController::class, 'result']);
});
