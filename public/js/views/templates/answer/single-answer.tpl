<div class="list-group-item single-answer">
    <div class="row answer-body">
        <div class="col-md-2 col-lg-2 col-sm-2">
            <!-- Closed indication -->
            <div class="best-controls">
                <span class="control indicator" title="<%- _t('closed.answerFits') %>">
                    <i class="fa fa-1-5 fa-check-circle-o "></i>
                </span>

                <span class="control select" title="<%- _t('closed.pick') %>">
                    <i class="fa fa-1-5 fa-check-circle-o "></i>
                </span>

                <span class="control cancel" title="<%- _t('closed.cancel') %>">
                    <i class="fa fa-1-5 fa-ban"></i>
                </span>
            </div>

            <!-- User info -->
            <figure class="user-info text-center">
                <img src="<%- user.thumb_avatar %>" alt="100x100" class="img-thumbnail big">
                <h5><%= user.first_name + ' ' + user.last_name %></h5>
            </figure>
        </div>
        <div class="col-md-10 col-lg-10 col-sm-10">
            <!-- Votes region -->
            <div class="votes"></div>

            <!-- Text -->
            <span class="time asked_time">
                <time class="relative" data-abs-time="<%- created_at %>">
                    <%- created_relative %>
                </time>
            </span>
            <form class="editing-form">
                <div class="editing-form-group">
                    <input class="hidden" name="description">
                    <div class="model-field description"><%= description %></div>
                    <span class="help-block hidden"></span>
                    <div class="error-block hidden"></div>
                </div>
            </form>

            <div class="related-controls">
                <button class="btn btn-default btn-xs show-form"><%= _t("comment.add") %></button>
            </div>
        </div>
        <div class="entry-controls">
            <span class="control edit"
                  title="<%- _t('ui.edit') %>">
                <i class="fa fa-pencil"></i>
            </span>
            <span class="control save"
                  title="<%- _t('ui.save') %>">
                <i class="fa fa-floppy-o "></i>
            </span>
            <span class="control cancel"
                  title="<%- _t('ui.cancel') %>">
                <i class="fa fa-ban"></i>
            </span>
            <span class="control delete"
                  title="<%- _t('ui.delete') %>">
                <i class="fa fa-times"></i>
            </span>
        </div>
    </div>
    <!-- Comments -->
    <div class="answers-comments-region"></div>
</div>