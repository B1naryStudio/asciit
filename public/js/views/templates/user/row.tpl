<td>
    <img src="<%- avatar %>"
         title="avatar"
         class="avatar">
</td>
<td><%- first_name %></td>
<td><%- last_name %></td>
<td><%- email %></td>
<td class="col-md-2">
    <% if (global_role) { %>
        <%- global_role.title %>
    <% } else { %>
        -
    <% } %>
</td>
<td class="col-md-2">
    <span class="role-value"><%- local_role.title %></span>
    <span class="role-select-wrapper"></span>
    <div class="error-block hidden">Алярм.</div>
</td>