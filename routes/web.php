<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\AdminDashboardController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard Routes
Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('dashboard.profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('dashboard.profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('dashboard.profile.destroy');

    // Admin Specific Routes
    Route::prefix('admin')->middleware(['role:admin'])->controller(AdminDashboardController::class)->group(function () {
        Route::get('/', 'admin')->name('dashboard.admin');
        Route::get('/users', 'users')->name('dashboard.admin.users');
        Route::get('/events', 'events')->name('dashboard.admin.events');
        Route::get('/recipes-and-menus', 'recipesAndMenus')->name('dashboard.admin.recipes-and-menus');
    });
});

require __DIR__.'/auth.php';
require __DIR__.'/api.php';
