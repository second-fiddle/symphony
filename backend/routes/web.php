<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\ResetPasswordController;
use App\Http\Controllers\Api\Auth\SignupController;
use App\Http\Controllers\Api\Auth\VerificationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::prefix('api')->group(function () {
    Route::post('login', [LoginController::class, 'login'])->name('login');
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('logout', [LoginController::class, 'logout']);
        Route::post('logout', [LoginController::class, 'logout']);
    });
    Route::post('reset-password', [ResetPasswordController::class, 'reset']);
    Route::get('change-password', [ResetPasswordController::class, 'changePassword'])->name('password.reset');
    Route::post('change-password', [ResetPasswordController::class, 'changePassword']);
    Route::prefix('signup')->group(function () {
        Route::post('identify', [SignupController::class, 'identify']);
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('profile', [SignupController::class, 'profile']);
            Route::post('register', [SignupController::class, 'register']);
        });
    });
    Route::prefix('verify')->group(function () {
        Route::get('{id}/{hash}', [VerificationController::class, 'verify'])->name('verification.verify');
    });
});
