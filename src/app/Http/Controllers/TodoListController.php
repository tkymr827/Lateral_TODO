<?php

namespace App\Http\Controllers;

use Facade\Ignition\QueryRecorder\Query;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    public function getTodos (Request $request){

        if($request -> query('mytodo') ?? false){
            $user = \Auth::user();
            $todos = \DB::table('todolist')->where('user_id',$user->id)->get();
        }else{
            // $todos = \DB::table('todolist')->get();
            $todos = \DB::table('todolist')->where('release',false)->get();
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
        return response()->json($todos);

    }
}
