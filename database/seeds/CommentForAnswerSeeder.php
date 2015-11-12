<?php

use Illuminate\Database\Seeder;
use App\Repositories\Contracts\CommentRepository;
use App\Repositories\Contracts\UserRepository;
use App\Repositories\Contracts\AnswerRepository;
use Faker\Factory;

class CommentForAnswerSeeder extends Seeder
{
    private $userRepository;
    private $answerRepository;
    private $commentRepository;

    public function __construct(
        UserRepository $userRepository,
        AnswerRepository $answerRepository,
        CommentRepository $commentRepository
    ) {
        $this->userRepository = $userRepository;
        $this->answerRepository = $answerRepository;
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
        $answers = $this->answerRepository->all();

        for ($i = 0; $i < 300; $i++) {
            $this->commentRepository->create([
                'text' => $faker->realText(500),
                'user_id'     => $users->random()->id,
                'q_and_a_id' => $answers->random()->id
            ]);
        }
    }
}
