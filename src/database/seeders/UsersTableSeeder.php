<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('users')->insert([
            'name' => 'ラテラル太郎',
            'email' => 'lateral@example.com',
            'password' => bcrypt('pass'),
        ]);
    }
}
