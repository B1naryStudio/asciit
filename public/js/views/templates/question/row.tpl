<div class="list-group-item">
    <div class="row">
        <div class="col-md-2 text-center">
            <img src="<%- user.avatar %>" width="100" height="100" alt="100x100" class="img-thumbnail">
            <div><b><%= user.first_name + ' ' + user.last_name %></b></div>
            <!--<div class="question-info">Answers: <span class="answers-counter"><%- answers_count %></span></div>-->
            <!--<div class="votes question-info">Votes: 3</div>-->
            <!--<div class="question-info">Comments: 2</div>-->
        </div>
        <div class="col-md-10">
            <div class="row">
                <div class="col-md-10 question-header">
                    <div class="asked_time">Asked at <%- created_local %></div>
                    <div><a class="question" href="#questions/<%- id %>"><b><%- title %></b></a></div>
                    <div class="folder">
                        <span class="icon glyphicon glyphicon-folder-close" aria-hidden="true"></span>
                        <%- folder.title %>
                    </div>
                </div>
                <div class="col-md-2 question-preview">
                    <i class="fa fa-thumbs-up fa-6"></i>
                    <%- vote_value %>
                </div>
            </div>
            <div class="row">
                <div>
                    <div class="limited"><%= description %></div>
                </div>
                <div>
                    <span></span>
                    <div class="tags"></div>
                    <a class="more" href="#questions/<%- id %>">Read more...</a>
                </div>
            </div>
        </div>
    </div>
</div>