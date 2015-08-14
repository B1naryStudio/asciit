<?php

use Illuminate\Database\Seeder;
use App\Repositories\Contracts\UserRepository;
use App\Repositories\Contracts\CommentRepository;
use App\Repositories\Contracts\QuestionRepository;
use Faker\Factory;

class CommentForQuestionSeeder extends Seeder
{
    private $userRepository;
    private $questionRepository;
    private $commentRepository;

    public function __construct(
        UserRepository $userRepository,
        QuestionRepository $questionRepository,
        CommentRepository $commentRepository
    ) {
        $this->userRepository = $userRepository;
        $this->questionRepository = $questionRepository;
        $this->commentRepository = $commentRepository;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();

        $users = $this->userRepository->all();
        $questions = $this->questionRepository->all();

        for ($i = 0; $i < 50; $i++) {
            $this->commentRepository->create([
                'text' => $faker->realText(500),
                'user_id'     => $users->random()->id,
                'q_and_a_id' => $questions->random()->id
            ]);
        }
    }
}
