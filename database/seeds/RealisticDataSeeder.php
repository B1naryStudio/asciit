<?php

use Illuminate\Database\Seeder;
use App\Repositories\Contracts\FolderRepository;
use App\Repositories\Contracts\UserRepository;
use App\Repositories\Contracts\QuestionRepository;
use App\Repositories\Contracts\AnswerRepository;
use App\Repositories\Contracts\CommentRepository;
use App\Repositories\Contracts\TagRepository;

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

    /**
     * @var TagRepository
     */
    private $tagRepository;

    public function __construct(
        FolderRepository $folderRepository,
        UserRepository $userRepository,
        QuestionRepository $questionRepository,
        AnswerRepository $answerRepository,
        CommentRepository $commentRepository,
        TagRepository $tagRepository
    ) {
        $this->folderRepository = $folderRepository;
        $this->userRepository = $userRepository;
        $this->questionRepository = $questionRepository;
        $this->answerRepository = $answerRepository;
        $this->commentRepository = $commentRepository;
        $this->tagRepository = $tagRepository;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
         * Preparations
         */

        // folders
        $folderJS = $this->folderRepository->findByField(
            'title',
            'JS'
        )->first();

        $folderPHP = $this->folderRepository->findByField(
            'title',
            'PHP'
        )->first();

        // users
        $users = $this->userRepository->all();

        // simple user
        $user = $this->userRepository->findByField(
            'email',
            'cypherpunks01@europe.com'
        )->first();

        // tags
        $tagLaravel = $this->tagRepository->findByField(
            'title',
            'laravel'
        )->first();

        $tagLaravel5 = $this->tagRepository->findByField(
            'title',
            'laravel5'
        )->first();

        $tagAjax = $this->tagRepository->findByField(
            'title',
            'ajax'
        )->first();

        /*
         * Question 1
         */
        $question = $this->questionRepository->create([
            'title' => 'Realistic mouse movement coordinates in javascript?',
            'description' => 'In javascript, is there a way I can create a variable and a function that "simulates" smooth mouse movement? i.e., say the function simulates a user starts from lower left corner of the browser window, and then moves mouse in a random direction slowly... The function would return x and y value of the next position the mouse would move each time it is called (would probably use something like setInterval to keep calling it to get the next mouse position). Movement should be restricted to the width and height of the screen, assuming the mouse never going off of it. What I don\'t want is the mouse to be skipping super fast all over the place. I like smooth movements/positions being returned.',
            'user_id' => $user->id,
            'folder_id' => $folderJS->id,
        ]);

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

        /*
         * Question 2
         */
        $authorOfQuestion = $users->random();
        $tags =
        $code4question = <<<'EOD'
<pre>
<code class="language-php">$result = DB::select("SELECT d.idDemo, d.idUsuario, u.Referencia, d.Uri_fichero,
        (SELECT Nombre FROM Edad_voz WHERE IdEdad_voz = d.IdEdad_voz) Edad_voz,
        (SELECT Nombre FROM Tono_voz WHERE idTono_voz = d.idTono_voz) Tono_voz,
        (SELECT Idioma_Variante FROM Idioma WHERE idIdioma = d.idIdioma) Idioma,
        (SELECT Nombre FROM Genero WHERE idGenero = d.idGenero) Genero

        FROM Demo AS d
        INNER JOIN logs AS l ON d.idDemo = l.idElemento
        INNER JOIN usuario AS u ON d.idUsuario = u.idUsuario

        WHERE

        l.accion = :tag AND
        l.procesado = '0'

        ORDER BY idDemo

        LIMIT :limit;", $params);

    if (is_empty($result)) throw new ModelNotFoundException;

    return $result;</code></pre>
EOD;

        $question2 = $this->questionRepository->create([
            'title' => 'Laravel returns an empty array instead of exception '
                . 'with status 200',
            'description' => 'I have a problem that when I query a database '
                . 'and get zero results, I get an empty array, though I want '
                . 'to throw a \'ModelNotFoundException\'. Here is my sample '
                . 'code:'
                . $code4question
                . 'I am sending a request via AJAX and want to return an error '
                . 'message and status. I have not modified the Handler class.',
            'user_id' => $authorOfQuestion->id,
            'folder_id' => $folderPHP->id,
            'closed' => true
        ]);

        $this->commentRepository->create([
            'text' => 'Can you share the Demo::getRecordsByTag($tag, $limit) code with us?',
            'user_id' => $users->random()->id,
            'q_and_a_id' => $question2->id
        ]);

        // tags
        $tags_for_question2 = [$tagAjax, $tagLaravel, $tagLaravel5];
        $this->questionRepository
            ->relationsAdd($question2, 'tags', $tags_for_question2);

        // Answer 1
        $answer = $this->answerRepository->create([
            'description' => '<p>​I would rewrite your&nbsp;<code>getRecordsByTag</code>&nbsp;function to take care if it like this:</p>
                <p><iframe class="code-snippet gist full-height" src="/gist-snippets?link=https%3A%2F%2Fgist.github.com%2FAntarus66%2F2ad7483f27a740082f56"></iframe><br />
                &nbsp;</p>',
            'user_id' => $users->random()->id,
            'question_id' => $question2->id,
            'closed' => true
        ]);

        $this->commentRepository->create([
            'text' => 'Thanks, for the reply. I have started to think that I should just return an empty response no matter what regardless of my app logic. Though now I think - that should depend on situation and I can decide myself if I want to throw an exception or return an empty query result.',
            'user_id' => $authorOfQuestion->id,
            'q_and_a_id' => $answer->id
        ]);

        // Answer 2
        $authorOfAnswer2 = $users->random();
        $descriptionForAnswer2 = <<<'EOT'
<p>first you&#39;d better remove the comment before the namespace:&nbsp;<code>#App\Http\Controller\MainController</code></p>

<p>second you can and should check if the class exists and then throw an exception manually</p>

<p>depending on the PHP version you&#39;re using you should be able to do something like:</p>

<pre>
<code class="hljs php"><span class="hljs-keyword">if</span> (class_exists(Demo::class)) {
    <span class="hljs-variable">$results</span> = Demo::getRecordsByTag(<span class="hljs-variable">$tag</span>, <span class="hljs-variable">$limit</span>);
} <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// or you can throw an exception from here</span>
    <span class="hljs-comment">// throw new Illuminate\Database\Eloquent\ModelNotFoundException(&#39;hello there error&#39;);</span>
    <span class="hljs-keyword">return</span> response()-&gt;json([<span class="hljs-string">&#39;message&#39;</span>=&gt;<span class="hljs-string">&#39;hello there error&#39;</span>], <span class="hljs-number">404</span>);
}</code></pre>
EOT;
        $answer2 = $this->answerRepository->create([
            'description' => $descriptionForAnswer2,
            'user_id' => $authorOfAnswer2->id,
            'question_id' => $question2->id
        ]);

        $authorOfCommentsToAnswer2 = $users->random();

        $this->commentRepository->create([
            'text' => 'thats not a namespace, thats the name of the file. The namespace is right below. Also - why should I check if the class exists? I am looking if there are any records with the parameters and want to throw an exception if the query returns 0 records like in the ->findOrFail method. ',
            'user_id' => $authorOfQuestion->id,
            'q_and_a_id' => $answer2->id
        ]);

        $this->commentRepository->create([
            'text' => 'yeah sorry ignore the comment regarding the line above namespace, my mistake. If Demo::getRecordsByTag() throws an exception you should be able to catch it as long as it\'s of the same type ModelNotFoundException if the query though returns 0 you should check that and throw/return on your own.',
            'user_id' => $authorOfCommentsToAnswer2->id,
            'q_and_a_id' => $answer2->id
        ]);

        $this->commentRepository->create([
            'text' => 'So if the method returns an empty array, I should throw an error myself?',
            'user_id' => $authorOfQuestion->id,
            'q_and_a_id' => $answer2->id
        ]);
    }
}
