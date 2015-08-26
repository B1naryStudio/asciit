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
        while (count($tags) < 150) {
            $title = $faker->word;
            if (empty($tags[$title])) {
                $tags[$title] = ['title' => $title];
            }
        }
        $tags = $this->tagRepository->createSeveral(array_values($tags));

        for ($i = 0; $i < 150; $i++) {
            $tmp = array_slice($tags, $i, rand(1, 3));

            for ($j = 0; $j < 1; $j++) {
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
}
