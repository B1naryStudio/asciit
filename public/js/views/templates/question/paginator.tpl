<div class="row">
    <div class="col-md-12 col-md-offset-5">
        <div id="pagination">
            <% if (currentPage != 1) { %>
            <button class="prev btn-default btn">Prev</button>
            <% } %>
            <div class="btn-group">
                <button data-toggle="dropdown" class="btn btn-default dropdown-toggle">Page <%= currentPage %> <span class="caret"></span></button>
                <ul class="dropdown-menu">
                    <% for(p=1;p<=totalPages;p++){ %>
                    <% if (currentPage == p) { %>
                    <li class="active"><a href="#" class="page"><%= p %></a></li>
                    <% } else { %>
                    <li><a href="#" class="page"><%= p %></a></li>
                    <% } %>
                    <% }%>
                </ul>
            </div>
            <% if (lastPage != currentPage && lastPage != 0) { %>
            <a href="#"><button class="btn btn-default next">Next</button></a>
            <% } %>
        </div>
    </div>
</div>
