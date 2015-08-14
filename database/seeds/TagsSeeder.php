<?php

use Illuminate\Database\Seeder;
use App\Repositories\Contracts\TagRepository;
use App\Repositories\Contracts\QuestionRepository;
use App\Repositories\Contracts\FolderRepository;
use App\Repositories\Contracts\UserRepository;
use Faker\Factory;

class TagsSeeder extends Seeder
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
        while (count($tags) < 100) {
            $title = $faker->word;
            if (empty($tags[$title])) {
                $tags[$title] = ['title' => $title];
            }
        }
        $tags = $this->tagRepository->createSeveral(array_values($tags));
        $tmp = array_slice($tags, 0, 3);

        for ($i = 0; $i < 5; $i++) {
            $model = $this->questionRepository->create([
                'title' => $faker->sentence,
                'description' => $faker->realText(1500),
                'user_id' => $users->random()->id,
                'folder_id' => $folders->random()->id,
            ]);

            $this->questionRepository->relationsAdd($model, 'tags', $tmp);
        }

        $tmp = array_slice($tags, 2, 4);
        for ($i = 0; $i < 7; $i++) {
            $model = $this->questionRepository->create([
                'title' => $faker->sentence,
                'description' => $faker->realText(1500),
                'user_id' => $users->random()->id,
                'folder_id' => $folders->random()->id,
            ]);

            $this->questionRepository->relationsAdd($model, 'tags', $tmp);
        }
    }
}
