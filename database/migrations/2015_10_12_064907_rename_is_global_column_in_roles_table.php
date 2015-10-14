<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameIsGlobalColumnInRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('roles', function (Blueprint $table) {
            $table->dropUnique('roles_title_is_global_unique');
            $table->dropColumn('is_global');

            $table->integer('local_id')->unsigned()->nullable();
            $table->foreign('local_id')->references('id')->on('roles')
                ->onDelete('cascade');
            $table->unique(array('title', 'local_id'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('roles', function (Blueprint $table) {
            $table->dropUnique('roles_title_local_id_unique');
            $table->dropForeign('roles_local_id_foreign');
            $table->dropColumn('local_id');

            $table->boolean('is_global')->nullable();
            //$table->unique(array('title', 'is_global'));
        });
    }
}
