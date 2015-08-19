<div class="list-group-item">
    <div class="row">
        <div class="col-md-2 text-center">
            <img src="<%- user.avatar %>" alt="100x100" class="img-thumbnail">
            <div><b><%= user.first_name + ' ' + user.last_name %></b></div>
        </div>
        <div class="col-md-10">
            <div class="row">
                <div class="votes question-preview">
                    <i class="fa fa-amazon fa-1"></i>
                    <%- answers_count %>&nbsp;
                    <i class="fa fa-thumbs-up fa-1"></i>
                    <%- vote_value %>
                </div>
                <div class="asked_time">Asked <%- created_relative %></div>
                <div class="title-wrapper">
                    <a class="question" href="#questions/<%- id %>">
                        <b><%- title %></b>
                    </a>
                </div>
                <div class="folder">
                    <span class="icon glyphicon glyphicon-folder-close" aria-hidden="true"></span>
                    <%- folder.title %>
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