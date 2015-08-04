<?php

use Illuminate\Database\Seeder;
use App\Repositories\Repositories\UserRepository;
use App\Repositories\Repositories\QuestionRepository;
use App\Repositories\Repositories\AnswerRepository;
use Faker\Factory;

class AnswersSeeder extends Seeder
{
    private $userRepository;
    private $questionRepository;
    private $answerRepository;

    public function __construct(
        UserRepository $userRepository,
        QuestionRepository $questionRepository,
        AnswerRepository $answerRepository
    ) {
        $this->userRepository = $userRepository;
        $this->questionRepository = $questionRepository;
        $this->answerRepository = $answerRepository;
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
            $this->questionRepository->create([
                'description' => $faker->realText(500),
                'user_id'     => $users->random()->id,
                'question_id' => $questions->random()->id
            ]);
        }
    }
}
