<?php

use Mockery as m;
use App\Services\Questions\QuestionService;
use App\Repositories\Entities\Question;
use App\Repositories\Entities\Folder;
use App\Repositories\Entities\Tag;
use App\Repositories\Exceptions\RepositoryException;

class QuestionServiceTest extends TestCase
{
    protected $question;
    protected $folder;
    protected $tag;

    protected $questionService;
    protected $questionRepo;
    protected $answerRepo;
    protected $folderRepo;
    protected $tagRepo;

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

        $this->folder = new Folder();
        $this->folder->forceFill([
            'id' => 1
        ]);

        $this->tag = new Tag();

        $this->questionRepo = m::mock('App\Repositories\Repositories\QuestionRepositoryEloquent');
        $this->answerRepo = m::mock('App\Repositories\Repositories\AnswerRepositoryEloquent');
        $this->folderRepo = m::mock('App\Repositories\Repositories\FolderRepositoryEloquent');
        $this->tagRepo = m::mock('App\Repositories\Repositories\TagRepositoryEloquent');
        $this->questionService = new QuestionService(
            $this->questionRepo,
            $this->answerRepo,
            $this->folderRepo,
            $this->tagRepo
        );

        $this->tagRepo->shouldReceive('pushCriteria')
            ->andReturn($this->tagRepo);

        $this->tagRepo->shouldReceive('all')
            ->andReturn([]);

        $this->tagRepo->shouldReceive('create')
            ->andReturn($this->tag);

        $this->tagRepo->shouldReceive('createSeveral')
            ->andReturn([$this->tag]);

        $this->questionRepo->shouldReceive('relationsAdd');
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
            ->with($this->question->id, ['user', 'folder', 'tags', 'votes'])
            ->once()
            ->andReturn($this->question);

        $this->assertSame(
            $this->question,
            $this->questionService->getQuestion($this->question->id)
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

        $this->questionService->getQuestion(1);
    }

    public function testGetAnswersOfQuestion()
    {
        $this->answerRepo->shouldReceive('findByFieldWithRelations')
            ->once()
            ->with('question_id', $this->question->id, ['user', 'votes'])
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
            'folder' => 'PHP',
            'tag'    => ['tests'],
            'folder_id' => $this->folder->id
        ];

        $this->folderRepo->shouldReceive('firstOrCreate')
            ->andReturn($this->folder);

        $this->questionRepo->shouldReceive('create')
            ->once()
            ->with($newQuestionData)
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

        $this->folderRepo->shouldReceive('firstOrCreate')
            ->once()
            ->with(['title' => $newQuestionData['folder']])
            ->andReturn($this->folder);

        $this->questionRepo->shouldReceive('create')
            ->andReturn($this->question);

        $this->questionService->createQuestion($newQuestionData);
    }
}
