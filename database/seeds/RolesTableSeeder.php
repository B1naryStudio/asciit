<?php

use Illuminate\Database\Seeder;
use App\Repositories\Contracts\RoleLocalRepository;
use App\Repositories\Contracts\RoleGlobalRepository;

class RolesTableSeeder extends Seeder
{
    private $roleLocalRepository;
    private $roleGlobalRepository;

    public function __construct(
        RoleLocalRepository $roleLocalRepository,
        RoleGlobalRepository $roleGlobalRepository
    ) {
        $this->roleLocalRepository = $roleLocalRepository;
        $this->roleGlobalRepository = $roleGlobalRepository;
    }
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $localAdmin = $this->roleLocalRepository->create(['title' => 'ADMIN']);
        $localUser = $this->roleLocalRepository->create(['title' => 'USER']);
        $globalAdmin = $this->roleGlobalRepository->create(['title' => 'ADMIN']);
        $globalUser = $this->roleGlobalRepository->create(['title' => 'USER']);

        $this->roleGlobalRepository->create(['title' => 'MODERATOR']);
        $this->roleGlobalRepository->create(['title' => 'TESTER']);

        // mapping
        $localAdmin->globals()->save($globalAdmin);
        $localUser->globals()->save($globalUser);
    }
}
