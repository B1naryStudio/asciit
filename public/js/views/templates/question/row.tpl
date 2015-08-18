<div class="list-group-item">
    <div class="row">
        <div class="col-md-2 col-sm-3 col-xs-12 text-center">
            <img src="<%- user.avatar %>" alt="100x100" class="img-thumbnail big">
            <div><b><%= user.first_name + ' ' + user.last_name %></b></div>
            <!--<div class="question-info">Answers: <span class="answers-counter"><%- answers_count %></span></div>-->
            <!--<div class="votes question-info">Votes: 3</div>-->
            <!--<div class="question-info">Comments: 2</div>-->
        </div>
        <div class="col-md-10 col-sm-9 col-xs-12">
            <div class="row">
                <div class="question-header">
                    <div class="votes question-preview">
                        <i class="fa fa-amazon fa-1"></i>
                        <%- answers_count %>&nbsp;
                        <i class="fa fa-thumbs-up fa-1"></i>
                        <%- vote_value %>
                    </div>
                    <div class="asked_time">Asked <%- created_relative %></div>
                    <div>
                        <a class="question" href="#questions/<%- id %>">
                            <b><%- title %></b>
                        </a>
                    </div>
                    <div class="folder">
                        <span class="icon glyphicon glyphicon-folder-close" aria-hidden="true"></span>
                        <%- folder.title %>
                    </div>
                </div>
            </div>
            <div class="row">
                <div>
                    <div class="limited"><%= description %></div>
                </div>
                <div class="tags-wrapper">
                    <div class="tags"></div>
                    <a class="more" href="#questions/<%- id %>">Read more...</a>
                </div>
            </div>
        </div>
    </div>
</div>