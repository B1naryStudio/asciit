<?php

use Mockery as m;
use App\Services\Questions\QuestionService;
use App\Repositories\Entities\Question;
use App\Repositories\Entities\Answer;
use App\Repositories\Entities\Folder;
use App\Repositories\Entities\Tag;
use App\Repositories\Entities\User;
use App\Repositories\Entities\Vote;
use App\Repositories\Exceptions\RepositoryException;

class QuestionServiceTest extends TestCase
{
    protected $question;
    protected $answer;
    protected $folder;
    protected $tag1;
    protected $tag2;
    protected $tag3;
    protected $vote;

    protected $questionService;
    protected $questionRepo;
    protected $answerRepo;
    protected $folderRepo;
    protected $tagRepo;
    protected $voteRepo;
    protected $commentRepo;

    public function setUp()
    {
        parent::setUp();

        // Test question
        $questionDescription = 'Lorem ipsum dolor sit amet, consectetur
            adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur.';
        $this->question = new Question();
        $this->question->forceFill([
            'id'          => 1,
            'title'       => 'Fallen eyebrow driving gloves cardinal richelieu
                              gentleman trophy face broom swaggy leaf crash?',
            'description' => $questionDescription,
            'folder_id'   => 1,
            'user_id'     => 1,
            'user'        => ['id' => 1,],
            'folder'      => ['title' => 'Eyebrows'],
        ]);

        $this->answer = new Answer([
            'id'          => 2,
            'description' => $questionDescription,
        ]);

        $this->user = new User([
            'id' => 1
        ]);

        $this->folder = new Folder();
        $this->folder->forceFill([
            'id' => 1
        ]);

        $this->tag1 = new Tag(['title' => 'fungus']);
        $this->tag2 = new Tag(['title' => 'dolorem']);
        $this->tag3 = new Tag(['title' => 'jsl']);

        $this->vote = new Vote([
            'id' => 1,
            'q_and_a_id' => 1,
            'user_id' => 1
        ]);

        $this->questionRepo = m::mock('App\Repositories\Repositories\QuestionRepositoryEloquent');
        $this->answerRepo = m::mock('App\Repositories\Repositories\AnswerRepositoryEloquent');
        $this->folderRepo = m::mock('App\Repositories\Repositories\FolderRepositoryEloquent');
        $this->tagRepo = m::mock('App\Repositories\Repositories\TagRepositoryEloquent');
        $this->voteRepo = m::mock('App\Repositories\Repositories\VoteRepositoryEloquent');
        $this->commentRepo = m::mock('App\Repositories\Repositories\CommentRepositoryEloquent');

        $this->questionService = new QuestionService(
            $this->questionRepo,
            $this->answerRepo,
            $this->folderRepo,
            $this->tagRepo,
            $this->voteRepo,
            $this->commentRepo
        );

        $this->tagRepo->shouldReceive('pushCriteria')
            ->andReturn($this->tagRepo);

        $this->tagRepo->shouldReceive('getByCriteria')
            ->andReturn(collect([$this->tag1, $this->tag2]));

        $this->tagRepo->shouldReceive('all')
            ->andReturn([$this->tag1, $this->tag2,]);

        $this->tagRepo->shouldReceive('create')
            ->andReturn($this->tag1);

        $this->tagRepo->shouldReceive('createSeveral')
            ->andReturn([$this->tag1]);

        $this->questionRepo->shouldReceive('relationsAdd');

        $this->voteRepo->shouldReceive('findWhere')
            ->andReturn($this->vote);

        $this->answerRepo->shouldReceive('withRelationCount')
            ->andReturn($this->answerRepo);

        Auth::shouldReceive('user')->andReturn($this->user);
    }

    public function tearDown()
    {
        m::close();
        parent::tearDown();
    }

    /*
     * Check if returns a model if it's exists
     */
    public function testGetQuestionReturnsQuestion()
    {
        $this->questionRepo->shouldReceive('findWithRelations')
            ->with($this->question->id, m::any())
            ->once()
            ->andReturn($this->question);

        $this->assertSame(
            $this->question,
            $this->questionService->getQuestionById($this->question->id)
        );
    }

    /*
     * Check if returns a model with relations 'user' and 'folder'
     */
    public function testGetQuestionReturnsWithRelations()
    {
        $this->questionRepo->shouldReceive('findWithRelations')
            ->with($this->question->id, ['user', 'folder', 'tags', 'comments.user'])
            ->once()
            ->andReturn($this->question);

        $this->assertSame(
            $this->question,
            $this->questionService->getQuestionById($this->question->id)
        );
    }

    /**
     * @expectedException App\Services\Questions\Exceptions\QuestionServiceException
     * @expectedExceptionMessage Entity is not found! No such question
     */
    public function testGetQuestionThrowsException()
    {
        $this->questionRepo->shouldReceive('findWithRelations')
            ->once()
            ->andThrow(RepositoryException::class, 'Entity is not found!');

        $this->questionService->getQuestionById(1);
    }

    public function testGetAnswersOfQuestion()
    {
        $this->answerRepo->shouldReceive('findByFieldWithRelations')
            ->once()
            ->with(
                'question_id',
                $this->question->id,
                ['user', 'comments.user', 'votes']
            )
            ->andReturn([$this->question]);

        $this->assertSame(
            $this->questionService->getAnswersOfQuestion($this->question->id),
            [$this->question]
        );
    }

    /*
     * method can create questions
     */
    public function testCreateQuestionCreates()
    {
        $newQuestionData = [
            'folder'    => 'PHP',
            'tag'       => ['tests'],
            'folder_id' => $this->folder->id,
            'tag'      => [
                $this->tag1->title,
                $this->tag2->title,
                $this->tag3->title,
            ],
        ];

        $this->folderRepo->shouldReceive('firstWhere')
            ->andReturn($this->folder);

        $this->questionRepo->shouldReceive('create')
            ->once()
            ->with($newQuestionData)
            ->andReturn($this->question);

        $this->questionRepo->shouldReceive('findWithRelations')
            ->andReturn($this->question);

        $this->assertEquals(
            $this->questionService->createQuestion($newQuestionData),
            $this->question
        );
    }

    public function testCreateQuestionSavesWithFolder()
    {
        $newQuestionData = [
            'folder' => 'PHP',
            'tag'    => ['tests'],
        ];

        $this->folderRepo->shouldReceive('firstWhere')
            ->once()
            ->with(['title' => $newQuestionData['folder']])
            ->andReturn($this->folder);

        $this->questionRepo->shouldReceive('create')
            ->andReturn($this->question);

        $this->questionRepo->shouldReceive('findWithRelations')
            ->andReturn($this->question);

        $this->questionService->createQuestion($newQuestionData);
    }
}
