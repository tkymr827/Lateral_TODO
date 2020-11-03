<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTodolistTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('todolist', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('task_name',30);
            $table->integer('user_id');
            $table->string('user_name');
            $table->boolean('release')->default(false);
            $table->string('progress');
            $table->date('complete_date')->nullable();
            $table->date('achievement_date');
            $table->text('content');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('todolist');
    }
}
