<form action="#" class="question-form">
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
    <div class="help">
        <%= _t("search.searchInfo") %>
    </div>
</form>

<div class="questions-list">
    <div class="list-group list"></div>
</div>
