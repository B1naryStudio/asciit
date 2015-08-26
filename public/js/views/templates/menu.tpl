<nav class="menu navbar navbar-inverse" role="navigation">
    <!-- Floating login panel, on the right side -->
    <ul class="user-panel nav navbar-nav navbar-right hidden-xs">
        <li class="user-avatar">
            <img src="<%- avatar %>" class="avatar img-rounded small"/>
        </li>
        <li class="dropdown email">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <%= email %><b class="caret"></b>
            </a>
            <ul class="dropdown-menu">
                <li><a href="#logout"><%= _t("ui.logout") %></a></li>
            </ul>
        </li>
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

    <!-- Site logo -->
    <div class="navbar-header">
        <a class="navbar-brand" href="#">AskIT</a>

        <button type="button" class="navbar-toggle collapsed"
                data-toggle="collapse" data-target="#navbar"
                aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
    </div>

    <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
            <li><a id="nav-question" href="#questions"><%= _t("questions.all") %></a></li>
            <li><a id="nav-question-add"><%= _t("questions.add") %></a></li>
            <li><a href="#activity"><%= _t("questions.my") %></a></li>
            <li><a id="nav-tags" href="#tags"><%= _t("tags.tags") %></a></li>
            <li><a id="nav-question" href="#folders"><%= _t("folders.folders") %></a></li>
            <li>
            <span class="hidden-lg hidden-md hidden-sm logout-xs    ">
                <%= email %>
            </span>
            </li>
            <li>
                <a class="hidden-lg hidden-md hidden-sm" href="#logout">
                    <%= _t("ui.logout") %>
                </a>
            </li>
        </ul>
    </div>
</nav>