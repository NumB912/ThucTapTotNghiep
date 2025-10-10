<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\UserController;

Route::apiResource('person',PersonController::class);
Route::apiResource('events', EventController::class);
Route::post('/signin', [AuthController::class, 'signin']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::get('/events/day/{date}', [EventController::class, 'getEventWithDays']);
Route::get('/events/month/{date}', [EventController::class, 'getEventWithMonth']);
Route::get('/people/day/{date}',[PersonController::class,'getPersonWithDay']);
Route::get('/people/month/{date}',[PersonController::class,'getPeopleWithMonth']);
Route::get('/users/{filename}', [UserController::class, 'avatar']);
Route::get('/images/{filename}', [ImageController::class, 'show']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/user', [UserController::class, 'update']);
    Route::post('/user/changepassword', [AuthController::class, 'changepassword']);
    Route::post('/favorite/add', [FavoriteController::class, 'addFavorite']);
    Route::post('/favorite/remove', [FavoriteController::class, 'remove']);
    Route::get('/favorite', [FavoriteController::class, 'index']);
    Route::get('/favorite/{id}', [FavoriteController::class, 'show']);
    Route::post('/user/avatar', [UserController::class, 'uploadAvatar']);
});
