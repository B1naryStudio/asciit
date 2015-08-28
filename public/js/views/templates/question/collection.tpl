<form action="#">
    <div class="form-group">
        <div class="input-group address-control search">
            <input type="text"
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
        <ul class="search-info">
            <li><%= _t("search.tagInfo") %><span><%= _t("search.tagInfoSpan") %></span></li>
            <li><%= _t("search.folderInfo") %><span><%= _t("search.folderInfoSpan") %></span></li>
        </ul>
        <span class="help-block hidden"></span>
    </div>
</form>

<div class="questions-list">
    <div class="list-group list"></div>
</div>
