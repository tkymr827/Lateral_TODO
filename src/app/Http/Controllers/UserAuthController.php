<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserAuthController extends Controller
{
    public function getUser(){
        $user = \Auth::user();
        // $user = \Auth::check();
        return response()->json($user);
    }

    public function logout(){
        \Auth::logout();
        return;
    }

    public function changePass (Request $request){
        $user = \Auth::user();
        $result = \DB::table('users')->where('id',$user->id)->update(['password' => \Hash::make($request->pass_value)]);
        \Auth::logout();
        // return response()->json($result);
        return;
    }
}
