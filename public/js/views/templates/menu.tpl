<nav class="menu navbar navbar-inverse" role="navigation">
    <div class="main-menu"></div>
    <ul class="user-panel nav navbar-nav navbar-right hidden-xs">
        <li class="dropdown lang">
            <a href="#" class="dropdown-toggle current-lang ua" data-toggle="dropdown">
                <%= _t("app.currentLanguage") %>
            </a>
            <ul class="dropdown-menu">
                <li><span data-lang="en">EN</span></li>
                <li><span data-lang="uk">UA</span></li>
                <li><span data-lang="ru">RU</span></li>
            </ul>
        </li>
    </ul>

    <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed"
                data-toggle="collapse" data-target="#navbar"
                aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <ul class="user-panel nav navbar-nav navbar-right hidden-sm hidden-md hidden-lg">
            <li class="dropdown lang">
                <a href="#" class="dropdown-toggle current-lang ua" data-toggle="dropdown">
                    <%= _t("app.currentLanguage") %>
                </a>
                <ul class="dropdown-menu">
                    <li><span data-lang="en">EN</span></li>
                    <li><span data-lang="uk">UA</span></li>
                    <li><span data-lang="ru">RU</span></li>
                </ul>
            </li>
        </ul>
    </div>

    <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
            <li><a id="nav-question" href="#questions"><%= _t("questions.all") %></a></li>
            <li><a id="nav-question-add"><%= _t("questions.add") %></a></li>
            <li><a href="#activity"><%= _t("questions.my") %></a></li>

            <% if (admin) { %>
                <li><a id="nav-question" href="#folders"><%= _t("folders.folders") %></a></li>
            <% } %>

            <li><a id="nav-tags" href="#tags"><%= _t("tags.tags") %></a></li>
        </ul>
    </div>
</nav>