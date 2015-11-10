<?php

use Illuminate\Database\Seeder;
use App\Repositories\Contracts\TagRepository;

class TagsSeeder extends Seeder
{
    private $tagRepository;

    public function __construct(TagRepository $tagRepository)
    {
        $this->tagRepository = $tagRepository;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
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
            'laravel5',
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
            'opencv',
            'firefox',
            'ubuntu',
        ];
        $tags = [];
        foreach ($tag_titles as $title) {
            $tags[$title] = ['title' => $title];
        }
        $this->tagRepository->createSeveral(array_values($tags));
    }
}
