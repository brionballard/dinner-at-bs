<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class AdminDashboardController extends Controller
{
    public function admin()
    {
        return Inertia::render('Dashboard');
    }

    public function users(Request $request)
    {
        return Inertia::render('Users',  [
            'can' => [
                'import' => auth()->user()->can('import', User::class),
            ],
        ]);
    }

    public function events(Request $request)
    {
        return Inertia::render('Events');
    }

    public function recipesAndMenus(Request $request)
    {
        return Inertia::render('RecipesAndMenus');
    }
}
