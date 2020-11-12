<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTodolistsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('todolists', function (Blueprint $table) {
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
            $table->string('editor')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('todolists');
    }
}
