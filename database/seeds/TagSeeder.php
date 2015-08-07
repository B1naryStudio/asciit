<?php

use Illuminate\Database\Seeder;
use App\Repositories\Contracts\TagRepository;
use App\Repositories\Contracts\QuestionRepository;
use App\Repositories\Contracts\FolderRepository;
use App\Repositories\Contracts\UserRepository;
use Faker\Factory;

class TagSeeder extends Seeder
{
    private $tagRepository;
    private $folderRepository;
    private $userRepository;
    private $questionRepository;

    public function __construct(
        QuestionRepository $questionRepository,
        TagRepository $tagRepository,
        FolderRepository $folderRepository,
        UserRepository $userRepository
    ) {
        $this->tagRepository = $tagRepository;
        $this->questionRepository = $questionRepository;
        $this->userRepository = $userRepository;
        $this->folderRepository = $folderRepository;
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

        $tags = [];
        for ($i = 0; $i < 3; $i++) {
            $tags[] = $this->tagRepository->create([
                'title' => $faker->sentence
            ]);
        }

        for ($i = 0; $i < 5; $i++) {
            $model = $this->questionRepository->create([
                'title' => $faker->sentence,
                'description' => $faker->realText(1500),
                'user_id' => $users->random()->id,
                'folder_id' => $folders->random()->id,
            ]);

            $this->questionRepository->relationsAdd($model, 'tags', $tags);
        }
    }
}
