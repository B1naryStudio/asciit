@extends('base')

@section('main')

    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="input-group address-control">
                    <input type="text" class="form-control" id="find_question_field" placeholder="Find question">
                      <span class="input-group-btn">
                            <button class="btn btn-default" id="search_address" type="button">
                                <span class="glyphicon glyphicon-search"></span>
                            </button>
                      </span>
                </div>
            </div>
        </div>
        <div class="row questions_list">
            <div class="col-md-12">
                <div class="list-group">
                    <div class="list-group-item">
                        <div class="row">
                            <div class="col-md-2 text-center">
                                <img src="http://placehold.it/100x100" class="img-thumbnail"/>
                                <div><b>Username</b></div>
                                <div class="votes">Votes: 3</div>
                                <div>Comments: 2</div>
                            </div>
                            <div class="col-md-10">
                                <div class="asked_time">Asked May 1 2012 at 19:42</div>
                                <div><a class="question" href=""><b>Lorem ipsum dolor sit amet, consectetur adipiscing elit interdum?</b></a></div>
                                <div class="folder"><span class="glyphicon glyphicon-folder-close" aria-hidden="true"></span> Folder</div>
                                <div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at urna facilisis, imperdiet nisi sed, volutpat magna. Sed metus diam, sodales nec malesuada non, vestibulum iaculis quam. Nunc vel nunc vel diam dictum suscipit. In non augue maximus, sollicitudin sapien in, ultrices ex...
                                    </p>
                                </div>
                                <div>
                                    <a href=""><span class="label label-default">Default</span></a>
                                    <a href=""><span class="label label-default">Default</span></a>
                                    <a href=""><span class="label label-default">Default</span></a>
                                    <a class="pull-right" href="">Read more...</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@stop