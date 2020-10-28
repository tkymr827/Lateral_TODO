<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserAuthController extends Controller
{
    //
    public function getUser(){
        $user = \Auth::user();
        // $user = \Auth::check();
        return response()->json($user);
    }
}
