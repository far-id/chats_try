<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        collect([
            [
                'name' => 'Farid Rizky Wijaya',
                'username' => 'far',
                'email' => 'far@far.test',
                'password' => 'password'
            ],
            [
                'name' => 'Iqbal Rizky Wijaya',
                'username' => 'iqbal',
                'email' => 'iq@iq.test',
                'password' => 'password'
            ]
        ])->each(fn($user) => User::create($user));
        User::factory(10)->create();
    }
}
