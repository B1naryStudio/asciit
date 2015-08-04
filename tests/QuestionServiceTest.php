<?php

use Mockery as m;
use App\QuestionService\QuestionService;
use App\Repositories\Repositories\QuestionRepositoryEloquent;
use App\Repositories\Entities\Question;
use App\Exceptions\RepositoryException;

class QuestionServiceTest extends TestCase
{
    protected $question;
    protected $questionService;
    protected $questionRepo;

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
            'folder'      => ['title' => 'Eyebrows']
        ]);

        $this->questionRepo = m::mock('App\Repositories\Repositories\QuestionRepositoryEloquent');
        $this->questionService = new QuestionService($this->questionRepo);
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
            $this->questionService->getQuestion($this->question->id)
        );
    }

    /*
     * Check if returns a model with relations 'user' and 'folder'
     */
    public function testGetQuestionReturnsWithRelations()
    {
        $this->questionRepo->shouldReceive('findWithRelations')
            ->with($this->question->id, ['user', 'folder'])
            ->once()
            ->andReturn($this->question);

        $this->assertSame(
            $this->question,
            $this->questionService->getQuestion($this->question->id)
        );
    }

    /**
     * @expectedException App\Exceptions\QuestionServiceException
     * @expectedExceptionMessage Entity is not found! No such question
     */
    public function testGetQuestionThrowsException()
    {
        $this->questionRepo->shouldReceive('findWithRelations')
            ->once()
            ->andThrow(RepositoryException::class, 'Entity is not found!');

        $this->questionService->getQuestion(1);
    }
}
