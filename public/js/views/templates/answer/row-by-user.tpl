<div class="list-group-item">
    <div class="row">
        <div class="col-md-3 col-lg-2 col-sm-3 col-xs-3 text-center">
            <img src="<%- user.avatar %>" alt="100x100" class="img-thumbnail">
            <div><b><%= user.first_name + ' ' + user.last_name %></b></div>
        </div>
        <div class="col-md-9 col-lg-10 col-sm-9 col-xs-9">
            <div class="row">
                <div class="votes answer-preview">
                    <i class="fa fa-thumbs-up fa-1"></i>
                    <%- vote_value %>
                </div>
                <span class="time asked_time">Answered
                    <time class="relative" data-local-time="<%- created_local %>">
                         <%- created_relative %>
                    </time>
                </span>
                <div class="title-wrapper">
                    For question:
                    <a class="question" href="#questions/<%- question.id %>">
                        <b><%- question.title %></b>
                    </a>
                </div>
            </div>
            <div class="row">
                <div>
                    <div class="limited"><%= description %></div>
                </div>
                <div>
                    <a class="more" href="#question/<%- question.id %>/answer/<%- id %>">Read more...</a>
                </div>
            </div>
        </div>
    </div>
</div>