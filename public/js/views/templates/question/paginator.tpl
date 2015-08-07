<div class="row">
    <div class="col-md-12 col-md-offset-5">
        <div>
            <ul class="pagination">
                <% if (currentPage != 1) { %>
                <li class="prev"><a href="#">&laquo;</a></li>
                <% } else { %>
                <li class="disabled prev"><a href="#">&laquo;</a></li>
                <% } %>
                <% for(p=1;p<=totalPages;p++){ %>
                <% if (currentPage == p) { %>
                <li class="active"><a href="#" class="page"><%= p %></a></li>
                <% } else { %>
                <li><a href="#" class="page"><%= p %></a></li>
                <% } %>
                <% }%>
                <% if (lastPage != currentPage && lastPage != 0) { %>
                <li class="next"><a href="#">&raquo;</a></li>
                <% } else { %>
                <li class="disabled next"><a href="#">&raquo;</a></li>
                <% } %>
            </ul>
        </div>
    </div>
</div>
