<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\TodoListController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/user_auth',[UserAuthController::class,'getUser']);

Route::match(['get', 'post'], '/get_todos', [TodoListController::class,'getTodos']);
Route::post('/add_todos',[TodoListController::class,'addTodos']);
Route::post('/del_todos',[TodoListController::class,'delTodos']);
Route::post('/edit_todos',[TodoListController::class,'editTodos']);
