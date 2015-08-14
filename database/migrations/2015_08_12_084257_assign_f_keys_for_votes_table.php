<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AssignFKeysForVotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('votes', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')
                ->onDelete('set null');
            $table->foreign('q_and_a_id')->references('id')->on('q_and_a')
                ->onDelete('set null');
            $table->unique(['user_id', 'q_and_a_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('votes', function (Blueprint $table) {
            $table->dropForeign('votes_user_id_foreign');
            $table->dropForeign('votes_q_and_a_id_foreign');
            $table->dropUnique('votes_user_id_q_and_a_id_unique');
        });
    }
}
