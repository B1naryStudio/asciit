<?php

use Illuminate\Database\Seeder;

use App\Repositories\Contracts\RoleRepository;
use App\Repositories\Contracts\UserRepository;

class RoleUserTableSeeder extends Seeder
{
    private $roleRepository;
    private $userRepository;

    public function __construct(
        RoleRepository $roleRepository,
        UserRepository $userRepository
    ) {
        $this->roleRepository = $roleRepository;
        $this->userRepository = $userRepository;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $usersCollection  = $this->userRepository->all();
        $usersArray = $usersCollection->all();
        $roleUser = $this->roleRepository->firstWhere(['title' => 'USER']);
        $this->roleRepository->relationsAdd($roleUser, 'users', $usersArray);

        $admin = $this->userRepository->firstWhere(['first_name' => 'admin']);
        $role_admin = $this->roleRepository->firstWhere(['title' => 'ADMIN']);
        $this->userRepository->relationsAdd($admin, 'roles', [$role_admin]);
    }
}
