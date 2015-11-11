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
            DB::table('roles')->truncate();
            DB::table('users')->truncate();
            DB::table('folders')->truncate();
            DB::table('q_and_a')->truncate();
            DB::table('tags')->truncate();
            DB::table('tag_q_and_a')->truncate();
            DB::table('comment')->truncate();
            DB::table('votes')->truncate();
            DB::table('roles')->truncate();
            DB::statement('SET foreign_key_checks = 1;');

            $this->call(RolesTableSeeder::class);
            $this->call(UsersSeeder::class);
            $this->call(FoldersSeeder::class);
            $this->call(TagsSeeder::class);
            $this->call(QuestionsSeeder::class);
            $this->call(AnswersSeeder::class);
            $this->call(CommentForAnswerSeeder::class);
            $this->call(CommentForQuestionSeeder::class);
            $this->call(RealisticDataSeeder::class);
            $this->call(VotesSeeder::class);
        });

        Model::reguard();
    }
}
