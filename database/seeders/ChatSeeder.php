<?php

namespace Database\Seeders;

use App\Models\Chat;
use App\Models\Message;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\DB;

class ChatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $chats = collect([
            [
                'user_1' => 1,
                'user_2' => 2,
            ],
            [
                'user_1' => 1,
                'user_2' => 3,
            ],
            [
                'user_1' => 1,
                'user_2' => 4,
            ],
            [
                'user_1' => 1,
                'user_2' => 5,
            ],
            [
                'user_1' => 1,
                'user_2' => 6,
            ],
            [
                'user_1' => 1,
                'user_2' => 7,
            ],
            [
                'user_1' => 2,
                'user_2' => 3,
            ],
            [
                'user_1' => 2,
                'user_2' => 4,
            ],
            [
                'user_1' => 2,
                'user_2' => 5,
            ],
            [
                'user_1' => 2,
                'user_2' => 6,
            ],
            [
                'user_1' => 2,
                'user_2' => 7,
            ],
            [
                'user_1' => 3,
                'user_2' => 4,
            ],
            [
                'user_1' => 3,
                'user_2' => 5,
            ],
            [
                'user_1' => 3,
                'user_2' => 6,
            ],
            [
                'user_1' => 3,
                'user_2' => 7,
            ],
            [
                'user_1' => 4,
                'user_2' => 5,
            ],
            [
                'user_1' => 4,
                'user_2' => 6,
            ],
            [
                'user_1' => 4,
                'user_2' => 7,
            ],
            [
                'user_1' => 5,
                'user_2' => 6,
            ],
            [
                'user_1' => 5,
                'user_2' => 7,
            ],
            [
                'user_1' => 6,
                'user_2' => 7,
            ]
        ])->each(function($chat) { 
                $ch = Chat::create([
                    'user_1' => $chat['user_1'],
                    'user_2' => $chat['user_2'],
                ]);
                $ch->messages()->create([
                    'sender_id' => 1,
                    'message' => 'Hello!',
                ]);
                $ch->messages()->create([
                    'sender_id' => 2,
                    'message' => 'Hi!',
                ]);
        });
    }
}
