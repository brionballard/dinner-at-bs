<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

use Spatie\Permission\Models\Role;
use Database\Seeders\RolesAndPermissionSeeder;

class DatabaseSeeder extends Seeder
{
    protected $admins = [
        [
            'name' => 'Brion Ballard',
            'email' => 'brionballard@gmail.com',
            'phone' => '6012919988',
            'password' => 'admin'
        ]
    ];

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->seedDataDependencies();
        
        if (env('APP_ENV') !== 'production') {
            $this->seedDevData();
        }
    }

    /**
     * Generate necessary data to properly run application
     */
    private function seedDataDependencies(): void
    {
        $this->call(RolesAndPermissionSeeder::class);
        $this->seedAdmins();
    }

    /**
     * Seed default administrators & assign admin role
     */
    private function seedAdmins(): void
    {
        foreach ($this->admins as $user) {
            $user['password'] = Hash::make($user['password']);
            $user = User::create($user);
            $role = Role::where('name', 'admin')->first();
            $user->assignRole($role);
        }
    }

    /**
     * Generate data for dev environment
     */
    private function seedDevData(): void
    {
        User::factory()->count(10)->create();
    }
}
