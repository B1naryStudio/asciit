<?php

use Illuminate\Database\Seeder;
use App\Repositories\Contracts\RoleRepository;

class RolesTableSeeder extends Seeder
{
    private $roleRepository;

    public function __construct(RoleRepository $roleRepository)
    {
        $this->roleRepository = $roleRepository;
    }
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->roleRepository->create(['title' => 'ADMIN']);
        $this->roleRepository->create(['title' => 'USER']);
    }
}
