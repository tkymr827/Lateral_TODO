<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class TodoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('todolists')->insert([
            [
                'task_name' => \Str::random(15),
                'user_id' => 1,
                'user_name' => "ラテラル太郎",
                'release' => false,
                'progress' => "進行中",
                'complete_date' => date('Y-m-d'),
                'achievement_date' => date('Y-m-d'),
                'content' => \Str::random(100),
            ],
            [
                'task_name' => \Str::random(15),
                'user_id' => 1,
                'user_name' => "ラテラル太郎",
                'release' => true,
                'progress' => "進行中",
                'complete_date' => date('Y-m-d'),
                'achievement_date' => date('Y-m-d'),
                'content' => \Str::random(100),
            ],
            [
                'task_name' => \Str::random(15),
                'user_id' => 1,
                'user_name' => "ラテラル太郎",
                'release' => true,
                'progress' => "完了",
                'complete_date' => date('Y-m-d'),
                'achievement_date' => date('Y-m-d'),
                'content' => \Str::random(100),
            ],
            [
                'task_name' => \Str::random(15),
                'user_id' => 20,
                'user_name' => "伊藤健一",
                'release' => false,
                'progress' => "進行中",
                'complete_date' => date('Y-m-d'),
                'achievement_date' => date('Y-m-d'),
                'content' => \Str::random(100),
            ],
            [
                'task_name' => \Str::random(15),
                'user_id' => 20,
                'user_name' => "伊藤健一",
                'release' => false,
                'progress' => "進行中",
                'complete_date' => date('Y-m-d'),
                'achievement_date' => date('Y-m-d'),
                'content' => \Str::random(100),
            ],
            [
                'task_name' => \Str::random(15),
                'user_id' => 21,
                'user_name' => "田中直樹",
                'release' => false,
                'progress' => "完了",
                'complete_date' => date('Y-m-d'),
                'achievement_date' => date('Y-m-d'),
                'content' => \Str::random(100),
            ],
            [
                'task_name' => \Str::random(15),
                'user_id' => 21,
                'user_name' => "田中直樹",
                'release' => false,
                'progress' => "進行中",
                'complete_date' => date('Y-m-d'),
                'achievement_date' => date('Y-m-d'),
                'content' => \Str::random(100),
            ],
        ]);
    }
}
