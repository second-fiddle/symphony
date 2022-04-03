<?php

use App\Http\Controllers\Api\Auth\SignupController;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('signup')->group(function () {
    Route::post('identify', [SignupController::class, 'identify']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('profile', [SignupController::class, 'profile']);
        Route::post('register', [SignupController::class, 'register']);
    });
});
