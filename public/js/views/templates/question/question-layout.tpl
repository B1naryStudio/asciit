<div class="row question_view">
    <div class="col-md-2 text-center">
        <!-- User's avatar and name -->
        <div class="row">
            <figure class="user-info text-center">
                <img src="<%- user.avatar %>" width="100" height="100" alt="100x100" class="img-thumbnail">
                <h5><%= user.first_name + ' ' + user.last_name %></h5>
            </figure>
        </div>
        <div class="tags row"></div>
    </div>
    <div class="col-md-10">
        <!-- Question header -->
        <div class="row">
            <!-- Time, title, folder -->
            <div class="col-md-10">
                <time>Asked <%- created_relative %></time>
                <h2><%- title %></h2>
                <div class="folder"><span class="icon glyphicon glyphicon-folder-open"></span> <%- folder.title %></div>
            </div>
            <!-- Voting block -->
            <div class="col-md-2">
                <div class="votes"></div>
            </div>
        </div>
        <!-- Text -->
        <p><%= description %></p>
        <!-- Comments -->
        <div class="comments">
            <header class="section-header">
                <button class="btn btn-default btn-xs add-comment">Add comment</button>
                <button class="btn btn-default btn-xs add-answer">Add answer</button>
            </header>
        </div>
    </div>
</div>
<div id="comments-region"></div>
<div id="answers-region"></div>
