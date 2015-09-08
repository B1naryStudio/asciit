<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, width=device-width">
    <title>Asciit</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" />
    <link href="http://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/css/select2.min.css" rel="stylesheet" />
    <link href="http://team.binary-studio.com/app/styles/css/style.css" rel="stylesheet" />
    <link href="assets/css/style.css" rel="stylesheet">
    <link href="assets/css/font-awesome.min.css" rel="stylesheet">
</head>
<body>
<input type="hidden" id="config-jspath" value="{{ env('JSPATH') }}">
</body>
<script src="{{ env('JSPATH') }}/config.js"></script>
<script src="{{ env('JSPATH') }}/vendor/autobahn/autobahn.js"></script>
<script data-main="{{ env('JSPATH') }}/require-main" src="{{ env('JSPATH') }}/vendor/require/require.js"></script>
<script src="http://team.binary-studio.com/app/javascripts/header.js"></script>
</html>