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

        $tag_titles = [
            'php',
            'javascript',
            'c#',
            'design',
            'css',
            'forms',
            'gulp',
            'marionette',
            'backbone',
            'jquery',
            'laravel',
            'f3',
            'zend',
            'zend2',
            'yii',
            'yii2',
            'node-js',
            'node',
            'code-ignite',
            'maven',
            'symfony2',
            'rest',
            'email',
            'unit-testing',
            'mono',
            'jade',
            'express',
            'tlp',
            'underscore',
            'pagination',
            'mvc',
            'bootstrap',
            'documentation',
            'popup',
            'collection',
            'mysql',
            '.net',
            'arrays',
            'ajax',
            'regex',
            'json',
            'angular',
            'wordpress',
            'string',
            'html5',
            'git',
            'svn',
            'apache',
            'postgresql',
            '.htaccess',
            'function',
            'file',
            'image',
            'gd',
            'phantomjs',
            'sorting',
            'http',
            'laravel',
            'opencv',
            'firefox'
        ];
        $tags = [];
        foreach ($tag_titles as $title) {
            $tags[$title] = ['title' => $title];
        }
        $tags = $this->tagRepository->createSeveral(array_values($tags));

        for ($i = 0; $i < count($tags); $i++) {
            $tmp = array_slice($tags, $i, rand(1, 3));

            for ($j = 0; $j < rand(1, 6); $j++) {
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
