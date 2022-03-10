<?php

namespace Database\Seeders;

use App\Models\Group;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect([
            [
                'name' => 'Laravel Indonesia',
                'slug' => 'laravel-indonesia',
                'description' => 'Forum untuk Laravel Programmer Indonesia',
            ],
            [
                'name' => 'React Indonesia',
                'slug' => 'react-indonesia',
                'description' => 'Forum untuk React Devloper Indonesia'
            ],
        ])->each(function($group) {
            Group::create($group);
            // $gr->id == 1 ? $gr->users()->attach([1, 2, 3]) : $gr->users()->attach([1,4,5.6,7]);
        });
    }
}
