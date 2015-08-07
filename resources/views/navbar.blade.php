<nav class="navbar navbar-inverse">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">AscIT</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                {{-- @if(Auth::user()) --}}
                    <li><a href="#">Questions</a></li>
                    <li><a href="#">Folders</a></li>
                    <li><a href="#">Add question</a></li>
                    <li><a href="#">My questions <span class="badge">2</span></a></li>
                {{--@else
                    <li><a href="#">Questions</a></li>
                @endif--}}
            </ul>
            <ul class="nav navbar-nav navbar-right">
                {{-- @if(Auth::user()) --}}
                    <li><img src="http://placehold.it/40x40" class="img-thumbnail"/></li>
                    <li><a href="#">Logout</a></li>
                {{--@else
                    <li><a href="login">Login</a></li>
                @endif--}}
            </ul>
        </div>
    </div>
</nav>