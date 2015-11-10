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

        $folderIdeas = $this->folderRepository->findByField(
            'title',
            'Ideas'
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

        $tagJavascript = $this->tagRepository->findByField(
            'title',
            'javascript'
        )->first();

        $tagCSS = $this->tagRepository->findByField(
            'title',
            'css'
        )->first();

        $tagHTML5 = $this->tagRepository->findByField(
            'title',
            'html5'
        )->first();

        $tagImage = $this->tagRepository->findByField(
            'title',
            'image'
        )->first();

        $tagJquery = $this->tagRepository->findByField(
            'title',
            'jquery'
        )->first();

        $tagGit = $this->tagRepository->findByField(
            'title',
            'git'
        )->first();


        $tagUbuntu = $this->tagRepository->findByField(
            'title',
            'ubuntu'
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

        // The only answer to th 1st question (1.1)
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

        // comment to question2
        $this->commentRepository->create([
            'text' => 'Can you share the Demo::getRecordsByTag($tag, $limit) code with us?',
            'user_id' => $users->random()->id,
            'q_and_a_id' => $question2->id
        ]);

        // tags
        $this->questionRepository
            ->relationsAdd($question2, 'tags', [$tagAjax, $tagLaravel, $tagLaravel5]);

        // Answer1 to question2
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

        /*
         * Question 3
         */
        $descriptionForQuestion3 = <<<'EOD'
<p>I am trying to use the JQuery reflection function and I am running into some trouble. The reflection feature works fine on any image I try to add the class to, however, it works only if I do not modify the size of the image.</p>

<p>Once I try to resize the image that I am applying a reflection to, the size I try to apply to it is neglected and some of the image is cut off... I was wondering what is the correct way to resize an image that I am applying a reflection to?</p>

<p><iframe class="code-snippet jsfiddle " src="http://jsfiddle.net/suxcd/embedded/"></iframe></p>

<p><strong>Note:</strong>&nbsp;If you remove &quot;width:50%&quot; the reflection works fine, and the entire image displays as it should.</p>
EOD;

        $question3 = $this->questionRepository->create([
            'title' => 'Image resize while using JQuery Reflection (jsfiddle)',
            'description' => $descriptionForQuestion3,
            'user_id' => $user->id,
            'folder_id' => $folderIdeas->id,
        ]);

        // tags
        $this->questionRepository
            ->relationsAdd($question3, 'tags', [$tagImage, $tagJquery]);

        $descriptionForAnswer1 = <<<'EOD'
<p>It is possible, but it only works when using one percentual value for all images that you use reflect on (or you have to use ID&#39;s).&nbsp;Anyway, here is the updated fiddle:</p>

<p><iframe class="code-snippet jsfiddle " src="http://jsfiddle.net/suxcd/embedded/"></iframe></p>

<p>Most important code: edited the document ready code:</p>

<pre>
<code class="language-javascript hljs">$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>() </span>{
    <span class="hljs-keyword">var</span> options = {
        opacity: <span class="hljs-number">0.75</span>
    };
    $(<span class="hljs-string">&#39;.reflect&#39;</span>).reflect(options);
    $(<span class="hljs-string">&#39;.reflected&#39;</span>).parent(<span class="hljs-string">&#39;.reflect&#39;</span>).children(<span class="hljs-string">&#39;canvas&#39;</span>).width(<span class="hljs-string">&#39;50%&#39;</span>);
});​</code></pre>
EOD;
        $answer1 = $this->answerRepository->create([
            'description' => $descriptionForAnswer1,
            'user_id' => $user->id,
            'question_id' => $question3->id,
        ]);

        $descriptionForAnswer2 = <<<'EOD'
<p>&nbsp;</p>
<blockquote><span class="author"><time class="relative" data-abs-time="2015-11-10 11:55:59">40 minutes ago</time> by John Malkovich:</span><br/>
Note:&nbsp;If you remove &quot;width:50%&quot; the reflection works fine, and the entire image displays as it should.</blockquote>
<img alt="" height="135" src="http://ascit.local/api/v1/images/1447157634_jpeg" style="float:right" width="135" />
<p>You are resizing by percentage, if you use a defined number it works.&nbsp;I guess the question is do you need it to be in %. Basically, I changed this</p>
<pre>
<code class="hljs cpp">h.scale(<span class="hljs-number"><span class="hljs-number"><span class="hljs-number"><span class="hljs-number"><span class="hljs-number"><span class="hljs-number">0.5</span></span></span></span></span></span>, -<span class="hljs-number"><span class="hljs-number"><span class="hljs-number"><span class="hljs-number"><span class="hljs-number"><span class="hljs-number">1</span></span></span></span></span></span>);</code>
</pre>
<p>0.5 same as 50%, you can set the 0.5 to a dynamic value easily. Get the width attribute on the img tag and if there is a % then grab the number convert it to decimal and use it there. If no % then don&#39;t change that</p>
EOD;

        $answer2 = $this->answerRepository->create([
            'description' => $descriptionForAnswer2,
            'user_id' => $users->random()->id,
            'question_id' => $question3->id,
        ]);

        /*
         * Question 4
         */
        $descriptionForQuestion4 = <<<'EOD'
<p>I recently saw that the Git console in Windows is colored, e.g. Green for additions, red for deletions, etc. How do I color my Ubuntu Git console like that?&nbsp;To install it, I used the command:</p>

<pre>
<code class="language-bash">$ apt-get install git-core</code></pre>
EOD;

        $question4 = $this->questionRepository->create([
            'title' => 'How to color the Git console in Ubuntu?',
            'description' => $descriptionForQuestion4,
            'user_id' => $users->random()->id,
            'folder_id' => $folderIdeas->id,
            'closed' => true
        ]);

        $this->questionRepository
            ->relationsAdd($question4, 'tags', [$tagGit, $tagUbuntu]);

        $authorOfAnswer1 = $users->random();
        $descriptionForAnswer1 = <<<'EOD'
<p>From the Unix &amp; Linux Stackexchange question&nbsp;</p>

<div class="link-preview-result-wrapper"><a href="http://unix.stackexchange.com/questions/44266/how-to-colorize-output-of-git"><img alt="" src="http://dummyimage.com/200x200/ffa800&amp;text=No+Preview" /></a><a class="link-preview-image-link" href="http://unix.stackexchange.com/questions/44266/how-to-colorize-output-of-git" src="http://unix.stackexchange.com/questions/44266/how-to-colorize-output-of-git" target="_blank">http://unix.stackexchange.com/questions/44266/how-to-colorize-output-of-git</a></div>

<div class="link-preview-result-wrapper">&nbsp;</div>

<blockquote>
<p>The&nbsp;<code>color.ui</code>&nbsp;is a meta configuration that includes all the various&nbsp;<code>color.*</code>&nbsp;configurations available with&nbsp;<code>git</code>&nbsp;commands. This is explained in-depth in&nbsp;<code>git help config</code>.</p>
</blockquote>
EOD;
        $answer1 = $this->answerRepository->create([
            'description' => $descriptionForAnswer1,
            'user_id' => $authorOfAnswer1->id,
            'question_id' => $question4->id,
        ]);

        $this->commentRepository->create([
            'text' => 'This works on OSX too, not just linux as the question was asking',
            'user_id' => $authorOfAnswer1->id,
            'q_and_a_id' => $answer1->id
        ]);
        $this->commentRepository->create([
            'text' => 'Probably need to add \'true\' at the end. git config --global color.ui auto true',
            'user_id' => $users->random()->id,
            'q_and_a_id' => $answer1->id
        ]);
        $this->commentRepository->create([
            'text' => 'no, auto is enough. ',
            'user_id' => $authorOfAnswer1->id,
            'q_and_a_id' => $answer1->id
        ]);
        $this->commentRepository->create([
            'text' => 'Is this change persistent?',
            'user_id' => $users->random()->id,
            'q_and_a_id' => $answer1->id
        ]);
        $this->commentRepository->create([
            'text' => 'yes, it is persistent',
            'user_id' => $authorOfAnswer1->id,
            'q_and_a_id' => $answer1->id
        ]);


        $descriptionForAnswer2 = <<<'EOD'
<p>Another way is to edit the&nbsp;<code>.gitconfig</code>&nbsp;(create one if not exist), for instance:</p>

<pre>
<code>vim ~/.gitconfig
</code></pre>

<p>and then add:</p>

<pre>
<code>[color]
  diff = auto
  status = auto
  branch = auto</code></pre>
EOD;

        $answer2 = $this->answerRepository->create([
            'description' => $descriptionForAnswer2,
            'user_id' => $users->random()->id,
            'question_id' => $question4->id,
        ]);

        $descriptionForAnswer3 = <<<'EOD'
<p>Add to your .gitconfig file next code:</p>

<pre>
<code>  [color]
    ui = auto
  [color "branch"]
    current = yellow reverse
    local = yellow
    remote = green
  [color "diff"]
    meta = yellow bold
    frag = magenta bold
    old = red bold
    new = green bold
  [color "status"]
    added = yellow
    changed = green
    untracked = cyan</code></pre>
EOD;

        $answer3 = $this->answerRepository->create([
            'description' => $descriptionForAnswer3,
            'user_id' => $users->random()->id,
            'question_id' => $question4->id,
            'closed' => true
        ]);

        $this->commentRepository->create([
            'text' => 'I\'m using an older version of git and setting color.ui auto did not work for me, this did. Thank you',
            'user_id' => $users->random()->id,
            'q_and_a_id' => $answer3->id
        ]);

        /*
         * Question 5
         */
        $descriptionForQuestion5 = <<<'EOD'
<p>I was hoping to make an example of Google Maps embedding using codepen. It doesn&#39;t work properly.</p>

<p>The map loads centred in the correct place but its a static image, not an interactive map with a marker and info box attached.&nbsp;Here&#39;s the codepen:&nbsp;</p>

<p><iframe class="code-snippet codepen " src="http://codepen.io/jonnybarnes/embed/bfdLj"></iframe></p>

<p>Is this a limitation with how codepen handles javascript or is there a way of making this work?</p>
EOD;

        $question5 = $this->questionRepository->create([
            'title' => 'Embedding Google Maps in a codepen',
            'description' => $descriptionForQuestion5,
            'user_id' => $users->random()->id,
            'folder_id' => $folderJS->id,
        ]);

        $this->questionRepository
            ->relationsAdd($question5, 'tags', [$tagJavascript, $tagCSS, $tagHTML5]);

        $this->commentRepository->create([
            'text' => 'I actually emailed their help desk about this very issue. They said it was a known bug and are still working on it.',
            'user_id' => $users->random()->id,
            'q_and_a_id' => $question5->id
        ]);

        $this->commentRepository->create([
            'text' => 'You can use jsfiddle though, it works quite flawlessly',
            'user_id' => $users->random()->id,
            'q_and_a_id' => $question5->id
        ]);

        $this->commentRepository->create([
            'text' => 'Whilst it doesn\'t work on the codepen website itself, if you embed the codepen on your own website everything works as you would expect.',
            'user_id' => $users->random()->id,
            'q_and_a_id' => $question5->id
        ]);

        $this->commentRepository->create([
            'text' => 'If you open console, you will see message: Uncaught ReferenceError: F is not defined.',
            'user_id' => $users->random()->id,
            'q_and_a_id' => $question5->id
        ]);
    }
}
