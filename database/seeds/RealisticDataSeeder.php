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
        $tagPHP = $this->tagRepository->findByField(
            'title',
            'php'
        )->first();

        $tagMysql = $this->tagRepository->findByField(
            'title',
            'mysql'
        )->first();

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
<img alt="" height="135" src="data:image/jpg;base64,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"
style="float:right" width="135" />
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

        /*
         * Question 6
         */
        $descriptionForQuestion6 = <<<'EOD'
<p>This is my MySQL query which I convert to laravel, and I&#39;m getting below error pls advice how to fix</p>

<pre>
<code class="language-php">$shiftData=   DB::table(DB::raw('shifts'))
    -&gt;whereRaw("time_sheet_id = $getTimesheet1-&gt;time_sheet_id AND user_id = $user_id-&gt;user_id")
    -&gt;whereRaw("$shift_start_time BETWEEN shift_start_time AND shift_end_time OR $shift_end_time BETWEEN shift_start_time AND shift_end_time OR $shift_start_time &gt;= shift_start_time AND $shift_end_time &lt;= shift_end_time")
    -&gt;get();
$shift_end_time = $request-&gt;input('shift_end_time');
$shift_start_time = $request-&gt;input('shift_start_time');</code></pre>

<p>I&#39;ve got QueryException in Connection.php line 651. Does anyone have an idea about it?</p>

EOD;

        $question6 = $this->questionRepository->create([
            'title' => 'Laravel whereRaw query error',
            'description' => $descriptionForQuestion6,
            'user_id' => $users->random()->id,
            'folder_id' => $folderPHP->id,
        ]);

        $this->questionRepository
            ->relationsAdd($question6, 'tags', [
                $tagPHP,
                $tagLaravel,
                $tagLaravel5,
                $tagMysql
            ]);

        $this->commentRepository->create([
            'text' => 'You need to put your time values (16:00:00, 20:00:00) in quotes.',
            'user_id' => $users->random()->id,
            'q_and_a_id' => $question6->id
        ]);

        $descriptionForAnswer1 = <<<'EOD'
<p>Your sql query looks like a pseudo code</p>

<p>&#39;shift start time&#39; and &#39;shift end time&#39; should be defined before sql query.</p>

<p>Try something like this:</p>

<pre>
<code>$shift_end_time = $request-&gt;input('shift_end_time');
$shift_start_time = $request-&gt;input('shift_start_time');

$shiftData=   DB::table('shifts')
    -&gt;where(time_sheet_id, $getTimesheet1-&gt;time_sheet_id)
    -&gt;where(user_id, $user_id-&gt;user_id)
    -&gt;whereBetween('shift_start_time', array($shift_start_time, $shift_end_time))
    -&gt;whereBetween('shift_end_time', array($shift_start_time, $shift_end_time))
    -&gt;where('shift_end_time', '&gt;=', 'shift_start_time')
    -&gt;get();</code></pre>
EOD;

        $answer1 = $this->answerRepository->create([
            'description' => $descriptionForAnswer1,
            'user_id' => $users->random()->id,
            'question_id' => $question6->id,
        ]);
    }
}
