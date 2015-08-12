@extends('base')

@section('main')

    <div class="container">
        <div class="row question_view">
            <div class="col-md-2 text-center">
                <img src="http://placehold.it/100x100" class="img-thumbnail"/>
                <div><b>Username</b></div>
                <div>
                    <a href=""><span class="label label-default">Default</span></a>
                    <a href=""><span class="label label-default">Default</span></a>
                    <a href=""><span class="label label-default">Default</span></a>
                    <a href=""><span class="label label-default">Default</span></a>
                </div>
            </div>
            <div class="col-md-10">
                <div class="row">
                    <div class="col-md-10">
                        <div class="asked_time">Asked May 1 2012 at 19:42</div>
                        <div class="question"><b>Lorem ipsum dolor sit amet, consectetur adipiscing elit interdum?</b></div>
                        <div class="folder"><span class="glyphicon glyphicon-folder-close" aria-hidden="true"></span>Folder</div>
                    </div>
                    <div class="col-md-2">
                        <div class="votes">
                            <a href=""><span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></a>
                            <span>5</span>
                            <a href=""><span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span></a>
                        </div>
                    </div>
                </div>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget lacinia nisi, et ultricies lorem. Suspendisse tristique metus ac tortor semper tincidunt. Nunc interdum luctus vestibulum. Nullam placerat augue quis orci feugiat, vitae gravida nunc vulputate. Ut sit amet nisi turpis. Integer euismod sagittis magna, vel vulputate orci rhoncus quis. Donec commodo et quam eu consectetur. Morbi vestibulum ultricies laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eu neque nibh. Nam gravida quis enim id pretium. Proin iaculis, odio et dignissim porta, dui libero mollis enim, nec posuere dolor tortor eu elit. Vivamus vestibulum hendrerit condimentum. Donec nulla augue, condimentum eu egestas porta, ornare sed nisl. Nulla facilisi.
                    </p>
                </div>
                <div class="row">
                    <div class="col-md-6 col-md-offset-3 centered">
                        <a href="">
                            <div class="thumbnail">
                                <div class="row">
                                    <div class="col-md-4">
                                        <img src="http://placehold.it/100x100" class="img-thumbnail"/>
                                    </div>
                                    <div class="col-md-8">
                                        <div><b>Link title</b></div>
                                        <div>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget lacinia nisi, et ultricies lorem. Suspendisse tristique metus ac tortor semper tincidunt.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget lacinia nisi, et ultricies lorem. Suspendisse tristique metus ac tortor semper tincidunt. Nunc interdum luctus vestibulum. Nullam placerat augue quis orci feugiat, vitae gravida nunc vulputate. Ut sit amet nisi turpis. Integer euismod sagittis magna, vel vulputate orci rhoncus quis. Donec commodo et quam eu consectetur. Morbi vestibulum ultricies laoreet.
                    </p>
                </div>
                <div>
                    <a class="btn btn-default" href="#" role="button">Add comment</a>
                </div>
            </div>
        </div>
        <div class="row answers_list">
            <div class="col-md-12">
                <div class="answers_header"><b>2 answers:</b></div><hr>
                <div class="list-group">
                    <div class="list-group-item">
                        <div class="row">
                            <div class="col-md-2">
                                <img src="http://placehold.it/100x100" class="img-thumbnail"/>
                                <div><b>Username</b></div>
                            </div>
                            <div class="col-md-10">
                                <div class="row">
                                    <div class="col-md-10">
                                        <div class="answered_time">Answered May 1 2012 at 19:42</div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="votes">
                                            <a href=""><span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></a>
                                            <span>5</span>
                                            <a href=""><span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span></a>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget lacinia nisi, et ultricies lorem. Suspendisse tristique metus ac tortor semper tincidunt. Nunc interdum luctus vestibulum. Nullam placerat augue quis orci feugiat, vitae gravida nunc vulputate. Ut sit amet nisi turpis. Integer euismod sagittis magna, vel vulputate orci rhoncus quis. Donec commodo et quam eu consectetur. Morbi vestibulum ultricies laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eu neque nibh. Nam gravida quis enim id pretium. Proin iaculis, odio et dignissim porta, dui libero mollis enim, nec posuere dolor tortor eu elit. Vivamus vestibulum hendrerit condimentum. Donec nulla augue, condimentum eu egestas porta, ornare sed nisl. Nulla facilisi.
                                    </p>
                                </div>
                                <div><a class="btn btn-default" href="#" role="button">Add comment</a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="your_answer">
                    <div class="your_answer_header"><b>Your answer:</b></div><hr>
                    <div><textarea rows="10" cols="60" name="text" placeholder="Enter answer"></textarea></div>
                    <div><a class="btn btn-default" href="#" role="button">Answer</a></div>
                </div>
            </div>
        </div>
    </div>

@stop