<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFKeyQuestionIdForQAndATable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('q_and_a', function (Blueprint $table) {
            $table->integer('question_id')->unsigned()->nullable();
            $table->foreign('question_id')->references('id')->on('q_and_a')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('q_and_a', function (Blueprint $table) {
            $table->dropForeign('q_and_a_question_id_foreign');
            $table->dropColumn('question_id');
        });
    }
}
