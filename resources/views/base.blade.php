<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, width=device-width">
    <title>Asciit</title>
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
    <link href="http://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/css/select2.min.css" rel="stylesheet" />
    <link href="http://team.binary-studio.com/app/styles/css/style.css" rel="stylesheet" />
    @if ($is_min)
        <link href="assets/css/all.css" rel="stylesheet">
    @else
        <link href="assets/css/style.css" rel="stylesheet">
        <link href="assets/css/font-awesome.min.css" rel="stylesheet">
    @endif
</head>
<body>
<div id="nav-wrapper">
    @include('menu')
</div>
<input type="hidden" id="config-js-path" value="{{ $js_path }}">
<input type="hidden" id="config-use-common-header" value="{{ $use_common_header }}">
</body>
<script src="{{ $js_path }}/vendor/autobahn/autobahn.min.js"></script>
<script src="http://team.binary-studio.com/app/javascripts/header.js"></script>

@if ($is_min)
    <script src="{{ $js_path }}/main.js"></script>
@else
    <script src="{{ $js_path }}/config.js"></script>
    <script data-main="{{ $js_path }}/require-main" src="{{ $js_path }}/vendor/require/require.min.js"></script>
@endif
</html>