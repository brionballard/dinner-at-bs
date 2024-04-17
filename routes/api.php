<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImportController;

Route::prefix('api')->group(function () {
    Route::prefix('v1')->group(function () {
        Route::prefix('imports')
        ->middleware('can:import')
        ->controller(ImportController::class)
        ->group(function () {
            Route::post('/users', 'users');
        });
    });
});