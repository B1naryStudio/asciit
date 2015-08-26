<div class="list-group-item single-answer single-comment">
    <div class="row">
        <!-- User info -->
        <div class="col-md-2 col-lg-2 col-sm-2">
            <figure class="user-info text-center">
                <img src="<%- user.avatar %>" alt="100x100" class="img-thumbnail medium">
                <h5><%= user.first_name + ' ' + user.last_name %></h5>
            </figure>
        </div>
        <div class="col-md-10 col-lg-10 col-sm-10">

            <!-- Text -->
            <span class="time commented_time">
                <time class="relative" data-abs-time="<%- created_at %>">
                     <%- created_relative %>
                </time>
            </span>
            <p><%- text %></p>
        </div>
    </div>
</div>