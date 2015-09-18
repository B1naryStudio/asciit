<div class="list-group-item single-answer single-comment">
    <div class="row">
        <!-- User info -->
        <div class="col-md-2 col-lg-2 col-sm-2">
            <figure class="user-info text-center">
                <img src="<%- user.thumb_avatar %>" alt="100x100" class="img-thumbnail medium">
                <h5><%= user.first_name + ' ' + user.last_name %></h5>
            </figure>
        </div>
        <div class="content col-md-10 col-lg-10 col-sm-10">
            <!-- Text -->
            <span class="time commented_time">
                <time class="relative" data-abs-time="<%- created_at %>">
                     <%- created_relative %>
                </time>
            </span>
            <form class="editing-form">
                <div class="editing-form-group">
                    <p class="model-field text"><%- text %></p>
                    <textarea class="hidden" name="text"></textarea>
                    <span class="help-block hidden"></span>
                    <span class="error-block hidden"></span>
                </div>
            </form>
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
</div>