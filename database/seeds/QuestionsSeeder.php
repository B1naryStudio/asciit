<?php

use Illuminate\Database\Seeder;
use App\Repositories\Contracts\FolderRepository;
use App\Repositories\Contracts\UserRepository;
use App\Repositories\Contracts\QuestionRepository;
use Faker\Factory;

class QuestionsSeeder extends Seeder
{
    private $folderRepository;
    private $userRepository;
    private $questionRepository;

    public function __construct(
        FolderRepository $folderRepository,
        UserRepository $userRepository,
        QuestionRepository $questionRepository
    ) {
        $this->folderRepository = $folderRepository;
        $this->userRepository = $userRepository;
        $this->questionRepository = $questionRepository;
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
        $folders = $this->folderRepository->all();

        for ($i = 0; $i < 20; $i++) {
            $this->questionRepository->create([
                'title' => $faker->sentence,
                'description' => $faker->realText(1500),
                'user_id' => $users->random()->id,
                'folder_id' => $folders->random()->id,
            ]);
        }
    }
}
