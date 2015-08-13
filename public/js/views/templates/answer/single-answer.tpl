<div class="list-group-item single-answer">
    <div class="row">
        <!-- User info -->
        <div class="col-md-2">
            <figure class="user-info text-center">
                <img src="<%- user.avatar %>" width="100" height="100" alt="100x100" class="img-thumbnail">
                <h5><%= user.first_name + ' ' + user.last_name %></h5>
            </figure>
        </div>
        <div class="col-md-10">
            <!-- Votes region -->
            <div class="votes"></div>

            <!-- Text -->
            <time>Answered at <%- created_at %></time>
            <div class="description"><%= description %></div>

            <!-- Comments -->
            <div class="comments">
                <button class="btn btn-default btn-xs show-form">Add comment</button>
            </div>
        </div>
    </div>
    <div class="answers-comments-region"></div>
</div>