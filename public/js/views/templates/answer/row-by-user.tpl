<div class="list-group-item">
    <div class="row">
        <div class="col-md-3 col-lg-3 col-sm-4 col-xs-3 text-center wrapper-avatar">
            <img src="<%- _.isEmpty(user.avatar) ? user.thumb_avatar : user.avatar %>" alt="100x100" class="img-thumbnail">
            <div><b><%= user.first_name + ' ' + user.last_name %></b></div>
        </div>
        <div class="col-md-9 col-lg-9 col-sm-8 col-xs-9">
            <div class="row">
                <div class="votes answer-preview">
                    <i class="fa fa-thumbs-up fa-1"></i>
                    <%- vote_value %>
                </div>
                <span class="time asked_time">
                    <time class="relative" data-abs-time="<%- created_at %>">
                         <%- created_relative %>
                    </time>
                </span>
                <div class="title-wrapper">
                    <%= _t("answers.for") %>:
                    <a class="question" href="#questions/<%- question.slug %>">
                        <b><%- question.title %></b>
                    </a>
                </div>
            </div>
            <div class="row">
                <div>
                    <div class="limited"><%= description %></div>
                </div>
                <div>
                    <a class="more" href="#question/<%- question.slug %>/answer/<%- id %>"><%= _t("ui.readMore") %>...</a>
                </div>
            </div>
        </div>
    </div>
</div>