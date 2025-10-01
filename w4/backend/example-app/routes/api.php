<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\UserController;

Route::apiResource('events', EventController::class);
Route::post('/addfavorite/${event_id}', [FavoriteController::class], 'addFavorite');
Route::post('/removefavorite/${event_id}', [FavoriteController::class], 'removeFavorite');
Route::post('/signin', [AuthController::class, 'signin']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::get('/events/day/{date}', [EventController::class, 'getEventWithDays']);
Route::get('/events/month/{date}', [EventController::class, 'getEventWithMonth']);
Route::get('/users/{filename}', [UserController::class, 'avatar']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/favorite', [FavoriteController::class, 'index']);
    Route::put('/user', [UserController::class, 'update']);
    Route::post('/user/changepassword', [AuthController::class, 'changepassword']);

    Route::post('/user/avatar', [UserController::class, 'uploadAvatar']);
});
