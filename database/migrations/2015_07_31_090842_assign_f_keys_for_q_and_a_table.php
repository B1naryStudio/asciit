<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AssignFKeysForQAndATable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('q_and_a', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')
                ->onDelete('set null');
            $table->foreign('folder_id')->references('id')->on('folders')
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
            $table->dropForeign('q_and_a_user_id_foreign');
            $table->dropForeign('q_and_a_folder_id_foreign');
        });
    }
}
