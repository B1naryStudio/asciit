<div class="row question_view">
    <div class="col-md-2 col-sm-2 col-lg-2 text-center">
        <!-- User's avatar and name -->
        <div class="row">
            <figure class="user-info text-center">
                <img src="<%- user.avatar %>" alt="100x100" class="img-thumbnail big">
                <h5><%= user.first_name + ' ' + user.last_name %></h5>
            </figure>
        </div>
        <div class="tags row"></div>
    </div>
    <div class="col-md-10 col-sm-10 col-lg-10">
        <!-- Question header -->
        <div class="row">
            <!-- Time, title, folder -->
            <div class="col-md-10 col-sm-9 col-lg-10 col-xs-9">
                <span class="time asked_time">
                    <time class="relative" data-abs-time="<%- created_at %>">
                         <%- created_relative %>
                    </time>
                </span>
                <h2 class="model-field"><%- title %></h2>
                <div class="folder">
                    <span class="icon glyphicon glyphicon-folder-open"></span>
                    <a href="#folders/<%- folder.title %>"><%- folder.title %></a>
                </div>
            </div>
            <!-- Voting block -->
            <div class="col-md-2 col-sm-3 col-lg-2 col-xs-3 votes-wrapper">
                <div class="votes question-votes"></div>
            </div>
        </div>
        <!-- Text -->
        <p class="model-field"><%= description %></p>
        <div class="error-block hidden"></div>
        <!-- Actions -->
        <div class="actions">
            <!-- Controls -->
            <div class="entry-controls">
                <span class="control edit"
                      title="<%- _t('ui.edit') %>">
                    <i class="fa fa-pencil"></i>
                </span>
                <span class="delete"
                      title="<%- _t('ui.delete') %>">
                    <i class="fa fa-times"></i>
                </span>
            </div>
            <!-- Comments -->
            <div class="comments">
                <button class="btn btn-default btn-xs add-comment"><%- _t("comment.add") %></button>
                <button class="btn btn-default btn-xs add-answer"><%- _t("answers.add") %></button>
            </div>
        </div>

    </div>
</div>
<div id="comments-region"></div>
<div id="answers-region"></div>
