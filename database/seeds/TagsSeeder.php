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

        $tmp = [];
        $tags = [];
        while (count($tmp) < 30) {
            $title = $faker->sentence;
            if (empty($tags[$title])) {
                $tags[$title] = ['title' => $title];
            }
        }
        $tags = $this->tagRepository->createSeveral(array_values($tags));
        $tags = array_slice($tags, 0, 5);

        for ($i = 0; $i < 10; $i++) {
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
