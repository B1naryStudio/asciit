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
            $table->dropUnique('roles_title_is_global_unique');
            $sql = 'DELETE FROM roles WHERE is_global IS NOT NULL';
            $table->dropColumn('is_global');
            DB::connection()->getPdo()->exec($sql);
            $table->unique('title');

        });
    }
}
