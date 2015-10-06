<table class="table table-hover users-table">
    <thead>
        <tr>
            <!-- Localization don't work with the namespaces 'user'|'users' -->
            <th><%= _t("person.avatar") %></th>
            <th><%= _t("person.firstName") %></th>
            <th><%= _t("person.lastName") %></th>
            <th><%= _t("person.email") %></th>
            <th><%= _t("person.role") %></th>
        </tr>
    </thead>
    <tbody class="users-list"></tbody>
</table>