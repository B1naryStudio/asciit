<?php

use Illuminate\Database\Seeder;
use App\Repositories\Contracts\FolderRepository;
use App\Repositories\Contracts\UserRepository;
use App\Repositories\Contracts\QuestionRepository;
use App\Repositories\Contracts\AnswerRepository;
use App\Repositories\Contracts\CommentRepository;

class RealisticDataSeeder extends Seeder
{
    /**
     * @var FolderRepository
     */
    private $folderRepository;

    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var QuestionRepository
     */
    private $questionRepository;

    /**
     * @var AnswerRepository
     */
    private $answerRepository;

    /**
     * @var CommentRepository
     */
    private $commentRepository;

    public function __construct(
        FolderRepository $folderRepository,
        UserRepository $userRepository,
        QuestionRepository $questionRepository,
        AnswerRepository $answerRepository,
        CommentRepository $commentRepository
    ) {
        $this->folderRepository = $folderRepository;
        $this->userRepository = $userRepository;
        $this->questionRepository = $questionRepository;
        $this->answerRepository = $answerRepository;
        $this->commentRepository = $commentRepository;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->questionRepository->makeModel();
        // simple user
        $user = $this->userRepository->findByField(
            'email',
            'cypherpunks01@europe.com'
        )->first();

        $folder = $this->folderRepository->findByField(
            'title',
            'JS'
        )->first();

        $question = $this->questionRepository->create([
            'title' => 'Realistic mouse movement coordinates in javascript?',
            'description' => 'In javascript, is there a way I can create a variable and a function that "simulates" smooth mouse movement? i.e., say the function simulates a user starts from lower left corner of the browser window, and then moves mouse in a random direction slowly... The function would return x and y value of the next position the mouse would move each time it is called (would probably use something like setInterval to keep calling it to get the next mouse position). Movement should be restricted to the width and height of the screen, assuming the mouse never going off of it. What I don\'t want is the mouse to be skipping super fast all over the place. I like smooth movements/positions being returned.',
            'user_id' => $user->id,
            'folder_id' => $folder->id,
        ]);

        $users = $this->userRepository->all();

        $answer = $this->answerRepository->create([
            'description' => 'Last I heard the browser\'s mouse position cannot be altered with JavaScript, so the question really has no answer "as is". The mouse position can be locked though. I\'m not certain whether it would be possible to implement a custom cursor that allows setting the position. This would include hiding and perhaps locking the stock cursor.',
            'user_id' => $users->random()->id,
            'question_id' => $question->id
        ]);

        $this->commentRepository->create([
            'text' => 'I am not looking for altering the mouse position, just getting the "random coordinates" as if it was moving.',
            'user_id' => $user->id,
            'q_and_a_id' => $answer->id
        ]);

        $this->commentRepository->create([
            'text' => 'Oh you mean a "virtual" mouse path which simulates a mouse moving? Well that is certainly possible, but making it "human" is a tricky mission. Math and randomizing to a point where the path acts like a mouse but still has that certain "jitter": perhaps set two points (start and stop), then move while smoothly changing the speed and then adding a small random vector of movement on X and Y axes. Not sure how to achieve this though.',
            'user_id' => $users->random()->id,
            'q_and_a_id' => $answer->id
        ]);
    }
}
