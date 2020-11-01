<?php

namespace App\Http\Controllers;

use Facade\Ignition\QueryRecorder\Query;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    public function getTodos (Request $request){


        $todos = [
            [
                'task_name' => 'sample1',
                'user_name' => 'hoge1',
                'release' => 'Public',
                'progress' =>  '進行中',
                'complete_date' => '2020/12/1',
                'achievement_date' => '2020/11/11',
            ],
            [
                'task_name' => 'sample2',
                'user_name' => 'hoge2',
                'release' => 'Public',
                'progress' =>  '進行中',
                'complete_date' => '2020/12/1',
                'achievement_date' => '2020/11/11',
            ],
            [
                'task_name' => 'sample3',
                'user_name' => 'hoge3',
                'release' => 'Public',
                'progress' =>  '進行中',
                'complete_date' => '2020/12/1',
                'achievement_date' => '2020/11/11',
            ],
            [
                'task_name' => 'sample4',
                'user_name' => 'hoge4',
                'release' => 'Public',
                'progress' =>  '進行中',
                'complete_date' => '2020/12/1',
                'achievement_date' => '2020/11/11',
            ],
        ];

        if($request -> query('mytodo')){

        }

        // return response()->json($request);
        // return $request->query('test');
        return response()->json($todos);

    }
}
