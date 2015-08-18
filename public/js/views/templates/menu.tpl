<nav class="menu navbar navbar-inverse">
    <!-- Floating login panel, on the right side -->
    <ul class="login nav navbar-nav navbar-right">
        <li class="user-avatar"><img src="<%- avatar %>" class="avatar img-rounded small"/></li>
        <li class="dropdown email">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><%= email %><b class="caret"></b></a>
            <ul class="dropdown-menu">
                <li><a href="/logout">Logout</a></li>
            </ul>
        </li>
    </ul>

    <!-- Site logo -->
    <div class="navbar-header">
        <a class="navbar-brand" href="/">AskIT</a>

        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
    </div>

    <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
            <li><a id="nav-question" href="/questions">Questions</a></li>
            <li><a id="nav-question-add" href="#">Add question</a></li>
            <li><a id="nav-question" href="/activity">My questions/My answers</a></li>
        </ul>
    </div>

</nav>