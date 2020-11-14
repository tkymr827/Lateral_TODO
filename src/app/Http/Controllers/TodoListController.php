<?php

namespace App\Http\Controllers;

use Facade\Ignition\QueryRecorder\Query;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    public function getTodos (Request $request){

        if($request -> query('mytodo') ?? false){
            $user = \Auth::user();
            // $todos = \DB::table('todolists')->where('user_id',$user->id)->get();
            $todos = \App\Models\Todolist::where('user_id',$user->id)->get();
            // $todos = \App\Models\Todolist::all();
        }else{
            // $todos = \DB::table('todolist')->get();
            // $todos = \DB::table('todolists')->where('release',false)->get();
            // $todos = \App\Models\Todolist::all();
            $todos = \App\Models\Todolist::where('release',false)->get();
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

    public function addTodos(Request $request){

        $user= \Auth::user();

        $add =[
            'task_name' => $request->post_value['task_name'],
            'user_name' => $user->name,
            'user_id' => $user->id,
            'content' => $request->post_value['content'],
            'release' => $request->post_value['release'],
            'progress' => $request->post_value['progress'],
            'complete_date' => $request->post_value['complete_date'],
            'achievement_date' => $request->post_value['achievement_date'],
        ];
        $result = \DB::table('todolists')->insert($add);

        return response()->json($result);
        // return response()->json($user);
    }

    public function delTodos(Request $request){

    //     $result = \DB::table('todolist')->where('id',$request->id)->delete();
    //     // return response()->json($request);
            // $result = \DB::table('todolist')->destroy($request);
            // $result = \DB::table('todolist')
            // $result = \App\Models\Todolist::destroy($request);
            $result =\App\Models\Todolist::destroy($request->selectDelete);
            // \App\Models\Todolist::destroy($request);

        if($result){
            $msg = "削除成功";
        }else{
            $msg = "削除失敗";
        }
        return response()->json($msg);
        // return response()->json($request);
    }

    public function editTodos(Request $request){

        // $update = [
        //     'task_name' => $request -> form_value -> task_name,
        //     'editor' => $request -> editor,
        //     'content' => $request -> form_value -> content,
        //     'release'=> $request -> form_value -> release,
        //     'progress' => $request -> form_value -> progress,
        //     'complete_date' => $request -> form_value -> complete_date,
        //     'achievement_date' => $request -> form_value -> achievement_date,
        // ];
        $update = [
            'task_name' => $request -> form_value['task_name'],
            'editor' => $request -> editor,
            'content' => $request -> form_value['content'],
            'release'=> $request -> form_value['release'],
            'progress' => $request -> form_value['progress'],
            'complete_date' => $request -> form_value['complete_date'],
            'achievement_date' => $request -> form_value['achievement_date'],
        ];

        $result = \DB::table('todolists')->where('id',$request->id)->update($update);

        if($result){
            $msg = "更新成功";
        }else{
            $msg = "更新失敗";
        }
        // return response()->json($update);
        return response()->json($msg);
        // return response()->json($request);
    }
}
