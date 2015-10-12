<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameRoleIdColumnInUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign('users_role_id_foreign');
            $table->renameColumn('role_id', 'local_role_id');
            $table->foreign('local_role_id')->references('id')->on('roles')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign('users_local_role_id_foreign');
            $table->renameColumn('local_role_id', 'role_id');
            $table->foreign('role_id')->references('id')->on('roles')
                ->onDelete('set null');
        });
    }
}
