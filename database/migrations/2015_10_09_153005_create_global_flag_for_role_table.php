<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGlobalFlagForRoleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('roles', function (Blueprint $table) {
            $table->boolean('is_global')->nullable();
            $table->dropUnique('roles_title_unique');
            $table->unique(array('title', 'is_global'));
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
            //DB::table('roles')->whereNotNull('is_global')->delete();
            //DB::table('roles')->delete(1);
            DB::table('roles')->delete();
            //$table->dropUnique('roles_title_is_global_unique');
            //$table->dropColumn('is_global');
            $table->unique('title');
        });
    }
}
