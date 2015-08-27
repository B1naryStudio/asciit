<?php

use Illuminate\Database\Seeder;
use App\Repositories\Contracts\FolderRepository;
use Faker\Factory;

class FoldersSeeder extends Seeder
{
    private $folderRepository;

    public function __construct(FolderRepository $folderRepository)
    {
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
        $folders = array('PHP', 'JS', '.NET', 'Ideas');
        foreach ($folders as $folder) {
            $this->folderRepository->create(['title' => $folder]);
        }
    }
}
