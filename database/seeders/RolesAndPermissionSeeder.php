<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionSeeder extends Seeder
{
    protected $roles = [
        'admin',
        'return-guest'
    ];

    protected $permissions = [
        'import',
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {  
        foreach ($this->roles as $role) {
            Role::create(['name' => $role]);
        }

        foreach ($this->permissions as $permission) {
            Permission::create(['name' => $permission]);
        }   
    }
}
