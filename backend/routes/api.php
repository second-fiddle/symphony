<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\ResetPasswordController;
use App\Http\Controllers\Api\Auth\SigninController;

/*
|-----------------------W---------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('api')->group(function () {
    Route::post('login', [LoginController::class, 'login'])->name('login');
    Route::get('logout', [LoginController::class, 'logout']);
    Route::post('logout', [LoginController::class, 'logout']);
    Route::post('reset-password', [ResetPasswordController::class, 'reset']);
    Route::get('change-password', [ResetPasswordController::class, 'changePassword'])->name('password.reset');
    Route::post('change-password', [ResetPasswordController::class, 'changePassword']);
    Route::prefix('signin')->group(function () {
        Route::post('identify', [SigninController::class, 'identify']);
    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
