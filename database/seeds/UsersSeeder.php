 <?php

use Illuminate\Database\Seeder;
use App\Repositories\Contracts\RoleLocalRepository;
use App\Repositories\Contracts\UserRepository;
use Faker\Factory;

class UsersSeeder extends Seeder
{
    private $roleRepository;
    private $userRepository;

    public function __construct(
        RoleLocalRepository $roleRepository,
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
        $faker = Factory::create();

        $roleUser = $this->roleRepository->firstWhere(['title' => 'USER']);
        $roleAdmin = $this->roleRepository->firstWhere(['title' => 'ADMIN']);

        for ($i = 0; $i < 30; $i++) {
            $this->userRepository->create([
                'first_name'     => $faker->firstNameMale,
                'last_name'      => $faker->lastName,
                'email'          => $faker->unique()->email,
                'remember_token' => str_random(10),
                'local_role_id'  => $roleUser->id,
            ]);
        }

        $this->userRepository->create([
            'first_name'     => 'admin',
            'last_name'      => 'admin',
            'email'          => 'admin@admin.com',
            'password'       => bcrypt('admin'),
            'remember_token' => str_random(10),
            'local_role_id'  => $roleAdmin->id,
        ]);

        $this->userRepository->create([
            'first_name'     => 'John',
            'last_name'      => 'Malkovich',
            'email'          => 'cypherpunks01@europe.com',
            'password'       => bcrypt('cypherpunks01'),
            'remember_token' => str_random(10),
            'local_role_id'  => $roleUser->id,
            'binary_id' => '55dc13391846c68a1ad56da3'
        ]);
    }
}
