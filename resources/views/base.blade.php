<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, width=device-width">
    <title>Asciit</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" />
    <link href="http://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/css/select2.min.css" rel="stylesheet" />
    <link href="http://team.binary-studio.com/app/styles/css/style.css" rel="stylesheet" />
    @if (env('JS_IS_MIN', false))
        <link href="assets/css/all.css" rel="stylesheet">
    @else
        <link href="assets/css/style.css" rel="stylesheet">
        <link href="assets/css/font-awesome.min.css" rel="stylesheet">
    @endif
</head>
<body>
<input type="hidden" id="config-jspath" value="{{ env('JS_PATH') }}">
</body>
<script src="{{ env('JS_PATH') }}/vendor/autobahn/autobahn.js"></script>
<script src="http://team.binary-studio.com/app/javascripts/header.js"></script>

@if (env('JS_IS_MIN', false))
    <script src="{{ env('JS_PATH') }}/main.js"></script>
@else
    <script src="{{ env('JS_PATH') }}/config.js"></script>
    <script data-main="{{ env('JS_PATH') }}/require-main" src="{{ env('JS_PATH') }}/vendor/require/require.js"></script>
@endif
</html>