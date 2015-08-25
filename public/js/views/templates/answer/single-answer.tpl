<div class="list-group-item single-answer">
    <div class="row">
        <!-- User info -->
        <div class="col-md-2 col-lg-2 col-sm-2">
            <figure class="user-info text-center">
                <img src="<%- user.avatar %>" alt="100x100" class="img-thumbnail big">
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
            <div class="description"><%= description %></div>

            <!-- Comments -->
            <div class="comments">
                <button class="btn btn-default btn-xs show-form"><%= _t("comment.add") %></button>
            </div>
        </div>
    </div>
    <div class="answers-comments-region"></div>
</div>