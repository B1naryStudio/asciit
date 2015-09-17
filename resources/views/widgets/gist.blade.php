<!DOCTYPE html>
<html>
    <head>
        <title>GitHub Gist</title>
        <link rel="stylesheet" type="text/css" href="{{ $stylesheet_link }}">
        <style>
            body {
                margin: 0;
            }
        </style>
    </head>
    <body>
    {!! $snippet !!}
    <script src="../../{{ $js_path }}/vendor/jquery/iframeResizer.contentWindow.min.js"></script>
    </body>
</html>
