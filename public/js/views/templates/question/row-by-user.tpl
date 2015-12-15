<div class="list-group-item">
    <div class="row">
        <div class="col-md-3 col-lg-3 col-sm-4 col-xs-3 text-center wrapper-avatar">
            <img src="<%- _.isEmpty(user.avatar) ? user.thumb_avatar : user.avatar %>" alt="100x100" class="img-thumbnail big">
            <div><b><%= user.first_name + ' ' + user.last_name %></b></div>
        </div>
        <div class="col-md-9 col-lg-9 col-sm-8 col-xs-9">
            <div class="row">
                <div class="question-header">
                    <div class="votes question-preview">
                        <i class="fa fa-comments-o fa-1"></i>
                        <%- answers_count %>&nbsp;
                        <i class="fa fa-thumbs-up fa-1"></i>
                        <%- vote_value %>
                    </div>
                    <span class="best-controls">
                        <span class="control indicator" title="<%- _t('closed.questionClosed') %>">
                            <i class="fa fa-1-5 fa-check-circle-o "></i>
                        </span>
                    </span>
                    <span class="time asked_time">
                        <time class="relative" data-abs-time="<%- created_at %>">
                             <%- created_relative %>
                        </time>
                    </span>
                    <div>
                        <a class="question" href="#questions/<%- slug %>">
                            <b><%- title %></b>
                        </a>
                    </div>
                    <div class="folder">
                        <span class="icon glyphicon glyphicon-folder-close" aria-hidden="true"></span>
                        <a href="#folders/<%- folder.title %>"><%- folder.title %></a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div>
                    <div class="limited"><%= description %></div>
                </div>
                <div class="tags-wrapper">
                    <div class="tags hidden-xs"></div>
                    <a class="more" href="#questions/<%- slug %>">
                        <%= _t("ui.readMore") %>...
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>