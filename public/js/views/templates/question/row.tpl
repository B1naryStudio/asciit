<div class="list-group-item">
    <div class="row">
        <div class="col-md-2 text-center">
            <img src="http://placehold.it/100x100" class="img-thumbnail"/>
            <div><b><%= user.first_name + ' ' + user.last_name %></b></div>
            <div class="votes">Votes: 3</div>
            <div>Comments: 2</div>
        </div>
        <div class="col-md-10">
            <div class="asked_time">Asked at <%- created_at %></div>
            <div><a class="question" href="/questions/<%- id %>"><b><%- title %></b></a></div>
            <div class="folder">
                <span class="glyphicon glyphicon-folder-close" aria-hidden="true"></span>
                <%- folder ? folder.title : 'No folder' %>
            </div>
            <div>
                <p class="limited"><%- description %></p>
            </div>
            <div>
                <a href=""><span class="label label-default">Default</span></a>
                <a href=""><span class="label label-default">Default</span></a>
                <a href=""><span class="label label-default">Default</span></a>
                <a class="pull-right" href="/questions/<%- id %>">Read more...</a>
            </div>
        </div>
    </div>
</div>