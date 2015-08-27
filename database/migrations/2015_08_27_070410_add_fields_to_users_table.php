<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFieldsToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('first_name')->default('Mysterious')->change();
            $table->string('last_name')->default('Anonym')->change();
            $table->string('avatar')->nullable()->change();
            $table->string('password', 60)->nullable()->change();

            $table->string('binary_id', 24)->nullable()->unique();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('gender')->nullable();
            $table->date('birthday')->nullable();


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
            $table->string('first_name')->change();
            $table->string('last_name')->change();
            $table->string('avatar')->change();
            $table->string('password', 60)->change();

            $table->dropColumn('binary_id');
            $table->dropColumn('country');
            $table->dropColumn('city');
            $table->dropColumn('gender');
            $table->dropColumn('birthday');
        });
    }
}