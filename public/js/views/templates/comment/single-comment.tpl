<div class="list-group-item single-answer single-comment">
    <div class="row">
        <!-- User info -->
        <div class="col-md-2">
            <figure class="user-info text-center">
                <img src="<%- user.avatar %>" width="70" height="70" alt="100x100" class="img-thumbnail">
                <h5><%= user.first_name + ' ' + user.last_name %></h5>
            </figure>
        </div>
        <div class="col-md-10">

            <!-- Text -->
            <time>Commented at <%- created_local %></time>
            <p><%- text %></p>
        </div>
    </div>
</div>