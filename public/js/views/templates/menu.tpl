<nav class="menu navbar navbar-inverse" role="navigation">
    <div class="main-menu"></div>
    <div class="custom-menu">
        <button class="menu-list-control button">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <button class="language button lang"><%= _t("app.currentLanguage") %></button>
    </div>
    <ul class="menu-list invisible">
        <li><a id="nav-question" href="#questions"><%= _t("questions.all") %></a></li>
        <li><a id="nav-question-add"><%= _t("questions.add") %></a></li>
        <li><a href="#activity"><%= _t("questions.my") %></a></li>

        <% if (admin) { %>
        <li><a id="nav-question" href="#folders"><%= _t("folders.folders") %></a></li>
        <% } %>

        <li><a id="nav-tags" href="#tags"><%= _t("tags.tags") %></a></li>
    </ul>

    <ul class="lang-list invisible">
        <li><span data-lang="en-US">EN</span></li>
        <li><span data-lang="uk-UA">UA</span></li>
        <li><span data-lang="ru-RU">RU</span></li>
    </ul>
</nav>