<!DOCTYPE html>
<html>
    <head>
        <title>GitHub Gist</title>
        <link rel="stylesheet" type="text/css" href="{{ $stylesheet_link }}">
        <link href="assets/css/widget/gist/style.css" rel="stylesheet">
    </head>
    <body>
        {!! $snippet !!}

        <script src="{{ $js_path }}/vendor/jquery/iframeResizer.contentWindow.min.js"></script>
        <script src="{{ $js_path }}/vendor/snippet-iframe/new-tab-redirector.min.js"></script>
    </body>
</html>
