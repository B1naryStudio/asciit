<form action="#" class="search-form user-search-form">
    <div class="form-group">
        <div class="input-group address-control search">
            <input type="text"
                   data-toggle="popover"
                   data-placement="bottom"
                   data-container="body"
                   data-trigger="focus"

                   class="form-control"
                   name="search_query"
                   id="search-query"
                   placeholder="<%= _t("search.placeholder") %>...">
            <span class="input-group-btn">
                <button class="btn btn-default" type="submit">
                    <span class="glyphicon glyphicon-search"></span>
                </button>
            </span>
        </div>
        <span class="help-block hidden"></span>
    </div>
</form>

<table class="table table-hover users-table">
    <thead>
        <tr>
            <!-- Localization don't work with the namespaces 'user'|'users' -->
            <th><%= _t("person.avatar") %></th>
            <th><%= _t("person.firstName") %></th>
            <th><%= _t("person.lastName") %></th>
            <th><%= _t("person.email") %></th>
            <th><%= _t("person.globalRole") %></th>
            <th><%= _t("person.localRole") %></th>
        </tr>
    </thead>
    <tbody class="users-list"></tbody>
</table>