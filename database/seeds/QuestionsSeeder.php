<?php

use Illuminate\Database\Seeder;
use App\Repositories\Contracts\FolderRepository;
use App\Repositories\Contracts\UserRepository;
use App\Repositories\Contracts\QuestionRepository;
use App\Repositories\Contracts\TagRepository;
use Faker\Factory;

class QuestionsSeeder extends Seeder
{
    private $folderRepository;
    private $userRepository;
    private $questionRepository;
    private $tagRepository;

    public function __construct(
        FolderRepository $folderRepository,
        UserRepository $userRepository,
        QuestionRepository $questionRepository,
        TagRepository $tagRepository
    ) {
        $this->folderRepository = $folderRepository;
        $this->userRepository = $userRepository;
        $this->questionRepository = $questionRepository;
        $this->tagRepository = $tagRepository;
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

        $admin = $this->userRepository
            ->findWhere(['email' => 'admin@admin.com'])
            ->first();

        for ($i = 0; $i < 7; $i++) {
            $this->questionRepository->create([
                'title' => $faker->sentence,
                'description' => $faker->realText(1500),
                'user_id' => $admin->id,
                'folder_id' => $folders->random()->id,
            ]);
        }

        $tags = $this->tagRepository->all();

        for ($i = 0; $i < count($tags); $i++) {
            $tags_for_question = $tags->slice($i, rand(1, 3))->all();

            for ($j = 0; $j < rand(1, 6); $j++) {
                $model = $this->questionRepository->create([
                    'title' => $faker->sentence,
                    'description' => $faker->realText(1500),
                    'user_id' => $users->random()->id,
                    'folder_id' => $folders->random()->id,
                ]);

                $this->questionRepository
                    ->relationsAdd($model, 'tags', $tags_for_question);
            }
        }
    }
}
