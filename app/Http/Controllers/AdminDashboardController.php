<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaView;
use App\Models\User;

class AdminDashboardController extends Controller
{
    /**
     * Return the admin dashboard
     * @return InvertiaView
     */
    public function admin(): InertiaView
    {
        return Inertia::render('Dashboard');
    }

    /**
     * Return the user view
     * @return InvertiaView
     */
    public function users(Request $request): InertiaView
    {
        return Inertia::render('Users',  [
            'can' => [
                'import' => auth()->user()->can('import', User::class),
            ],
            'users' => User::paginate($request->query('perPage') ? $request->query('perPage') : 10)
        ]);
    }

    /**
     * Return the events view
     * @return InvertiaView
     */
    public function events(Request $request): InertiaView
    {
        return Inertia::render('Events');
    }

    /**
     * Return the recipes and menus view
     * @return InvertiaView
     */
    public function recipesAndMenus(Request $request): InertiaView
    {
        return Inertia::render('RecipesAndMenus');
    }
}
