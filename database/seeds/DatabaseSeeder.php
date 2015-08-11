<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        DB::transaction(function () {
            DB::statement('SET foreign_key_checks = 0;');
            DB::table('users')->truncate();
            DB::table('folders')->truncate();
            DB::table('q_and_a')->truncate();
            DB::table('tags')->truncate();
            DB::statement('SET foreign_key_checks = 1;');

            $this->call(UsersSeeder::class);
            $this->call(FoldersSeeder::class);
            $this->call(QuestionsSeeder::class);
            $this->call(AnswersSeeder::class);
            $this->call(TagsSeeder::class);
        });

        Model::reguard();
    }
}
