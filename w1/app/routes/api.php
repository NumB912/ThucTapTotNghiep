<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WishController;
use App\Http\Controllers\UserController; // nhớ import UserController

use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Đây là nơi khai báo API route
|
*/

Route::get('/wishes', [WishController::class, 'index']);
Route::get('/wishes/{id}', [WishController::class, 'show']);
Route::delete('/wishes/{id}', [WishController::class, 'delete']);
Route::post('/wishes/{id}/draw', [WishController::class, 'draw']); // bắt buộc POST

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // các route bảo vệ khác như UserController
    // Route::get('/user', [UserController::class, 'index']);
});
