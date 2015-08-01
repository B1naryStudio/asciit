<?php

use Illuminate\Database\Seeder;
use App\Repositories\Repositories\UserRepository;
use Faker\Factory;

class UsersSeeder extends Seeder
{
    private $userRepository;
    public function __construct(UserRepository $userRepository)
    {
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

        for ($i = 0; $i < 30; $i++) {
            $this->userRepository->create([
                'first-name' => $faker->firstNameMale,
                'last-name'  => $faker->lastName,
                'email'     => $faker->unique()->email,
                'password'  => bcrypt('secret'),
                'avatar'    => $faker->url,
                'remember_token' => str_random(10),
            ]);
        }

        $this->userRepository->create([
            'first-name' => 'admin',
            'last-name'  => 'admin',
            'email'     => 'admin@admin.com',
            'password' => bcrypt('admin'),
            'avatar'    => $faker->url,
            'remember_token' => str_random(10),
        ]);

        $this->userRepository->create([
            'first-name' => 'unknown',
            'last-name'  => 'unknown',
            'email'     => 'cypherpunks01@europe.com',
            'password' => bcrypt('cypherpunks01'),
            'avatar'    => $faker->url,
            'remember_token' => str_random(10),
        ]);
    }
}
