<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTagQAndATable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tag_q_and_a', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('tag_id')->unsigned()->nullable()
                ->references('id')->on('tags')->onDelete('cascade');

            $table->integer('q_and_a_id')->unsigned()->nullable()
                ->references('id')->on('q_and_a')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tag_q_and_a');
    }
}
