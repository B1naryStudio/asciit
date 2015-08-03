<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>AscIT</title>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" rel="stylesheet" >
        <link href="assets/css/style.css" rel="stylesheet">
    </head>
    <body>
        @include('navbar')
        <div class="container">
            <div class="row">
                @yield('main')
            </div>
        </div>
    </body>
</html>