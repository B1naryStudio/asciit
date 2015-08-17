<div class="list-group-item">
    <div class="row">
        <div class="col-md-2 text-center">
            <img src="<%- user.avatar %>" alt="100x100" class="img-thumbnail">
            <div><b><%= user.first_name + ' ' + user.last_name %></b></div>
        </div>
        <div class="col-md-10">
            <div class="row">
                <div class="votes answer-preview">
                    <i class="fa fa-thumbs-up fa-6"></i>
                    <%- vote_value %>
                </div>
                <div class="asked_time">Answered <%- created_relative %></div>
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
                    <span></span>
                    <a class="more" href="#answers/<%- id %>">Read more...</a>
                </div>
            </div>
        </div>
    </div>
</div>