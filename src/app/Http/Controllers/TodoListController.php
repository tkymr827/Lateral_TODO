<?php

namespace App\Http\Controllers;

use Facade\Ignition\QueryRecorder\Query;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    public function getTodos (Request $request){


        // $todos = [
        //     [
        //         'task_name' => 'sample1',
        //         'user_name' => 'hoge1',
        //         'release' => 'Public',
        //         'progress' =>  '進行中',
        //         'complete_date' => '2020/12/1',
        //         'achievement_date' => '2020/11/11',
        //     ],
        //     [
        //         'task_name' => 'sample2',
        //         'user_name' => 'hoge2',
        //         'release' => 'Public',
        //         'progress' =>  '進行中',
        //         'complete_date' => '2020/12/1',
        //         'achievement_date' => '2020/11/11',
        //     ],
        //     [
        //         'task_name' => 'sample3',
        //         'user_name' => 'hoge3',
        //         'release' => 'Public',
        //         'progress' =>  '進行中',
        //         'complete_date' => '2020/12/1',
        //         'achievement_date' => '2020/11/11',
        //     ],
        //     [
        //         'task_name' => 'sample4',
        //         'user_name' => 'hoge4',
        //         'release' => 'Public',
        //         'progress' =>  '進行中',
        //         'complete_date' => '2020/12/1',
        //         'achievement_date' => '2020/11/11',
        //     ],
        //     [
        //         'task_name' => 'test',
        //         'user_name' => 'test',
        //         'release' => 'Public',
        //         'progress' =>  '進行中',
        //         'complete_date' => '2020/12/1',
        //         'achievement_date' => '2020/11/11',
        //     ],
        //     [
        //         'task_name' => 'てててて',
        //         'user_name' => 'test',
        //         'release' => 'Private',
        //         'progress' =>  '進行中',
        //         'complete_date' => '2020/12/1',
        //         'achievement_date' => '2020/11/11',
        //     ],
        //     [
        //         'task_name' => 'てすてすてす',
        //         'user_name' => 'test',
        //         'release' => 'Public',
        //         'progress' =>  '進行中',
        //         'complete_date' => '2020/12/1',
        //         'achievement_date' => '2020/11/11',
        //     ],
        // ];
        // $hoge = "hogegeg";

        if($request -> query('mytodo')){
            $user = \Auth::user();
            // $todos = \DB::table('todolist')->get();
            $todos = \DB::table('todolist')->where('user_id',$user->id)->get();
        }else{
            $todos = \DB::table('todolist')->get();
        }



        foreach($todos as $todo){
            if($todo->release){
                $todo->release = 'Private';
            }else{
                $todo->release = 'Public';
            }

            if($todo->progress === "進行中" && $todo->achievement_date < date('Y-m-d')){
                $todo->progress = "期限切れ";
            }
        }
        // unset($todo);

        // return response()->json($request);
        // return $request->query('test');
        return response()->json($todos);
        // return response()->json([
        //     'todos' => $todos,

        //     // 'hoge' =>$hoge,
        //     // 'now' => date('Y-m-d'),
        //     // 'request' => $request -> query('mytodo')
        // ]);

    }
}
