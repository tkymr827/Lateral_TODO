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
                'user_id' => 3,
                'user_name' => "選択削除テスト",
                'release' => false,
                'progress' => "進行中",
                'complete_date' => date('Y-m-d'),
                'achievement_date' => date('Y-m-d'),
                'content' => \Str::random(100),
            ],
            [
                'task_name' => \Str::random(15),
                'user_id' => 3,
                'user_name' => "選択削除テスト",
                'release' => false,
                'progress' => "進行中",
                'complete_date' => date('Y-m-d'),
                'achievement_date' => date('Y-m-d'),
                'content' => \Str::random(100),
            ],
            [
                'task_name' => \Str::random(15),
                'user_id' => 3,
                'user_name' => "選択削除テスト",
                'release' => false,
                'progress' => "進行中",
                'complete_date' => date('Y-m-d'),
                'achievement_date' => date('Y-m-d'),
                'content' => \Str::random(100),
            ],
            [
                'task_name' => \Str::random(15),
                'user_id' => 3,
                'user_name' => "選択削除テスト",
                'release' => false,
                'progress' => "進行中",
                'complete_date' => date('Y-m-d'),
                'achievement_date' => date('Y-m-d'),
                'content' => \Str::random(100),
            ],
            [
                'task_name' => \Str::random(15),
                'user_id' => 3,
                'user_name' => "選択削除テスト",
                'release' => false,
                'progress' => "完了",
                'complete_date' => date('Y-m-d'),
                'achievement_date' => date('Y-m-d'),
                'content' => \Str::random(100),
            ],
        ]);
        // \DB::table('todolist')->insert([
        //     [
        //         'task_name' => \Str::random(15),
        //         'user_id' => 1,
        //         'user_name' => "test",
        //         'release' => false,
        //         'progress' => "進行中",
        //         'complete_date' => date('Y-m-d'),
        //         'achievement_date' => date('Y-m-d'),
        //         'content' => \Str::random(100),
        //     ],
        //     [
        //         'task_name' => \Str::random(15),
        //         'user_id' => 1,
        //         'user_name' => "test",
        //         'release' => false,
        //         'progress' => "進行中",
        //         'complete_date' => date('Y-m-d'),
        //         'achievement_date' => date('Y-m-d'),
        //         'content' => \Str::random(100),
        //     ],
        //     [
        //         'task_name' => \Str::random(15),
        //         'user_id' => 1,
        //         'user_name' => "test",
        //         'release' => true,
        //         'progress' => "進行中",
        //         'complete_date' => date('Y-m-d'),
        //         'achievement_date' => date('Y-m-d'),
        //         'content' => \Str::random(100),
        //     ],
        //     [
        //         'task_name' => \Str::random(15),
        //         'user_id' => 2,
        //         'user_name' => "other",
        //         'release' => false,
        //         'progress' => "進行中",
        //         'complete_date' => date('Y-m-d'),
        //         'achievement_date' => date('Y-m-d'),
        //         'content' => \Str::random(100),
        //     ],
        //     [
        //         'task_name' => \Str::random(15),
        //         'user_id' => 2,
        //         'user_name' => "other",
        //         'release' => true,
        //         'progress' => "完了",
        //         'complete_date' => date('Y-m-d'),
        //         'achievement_date' => date('Y-m-d'),
        //         'content' => \Str::random(100),
        //     ],
        // ]);
    }
}
