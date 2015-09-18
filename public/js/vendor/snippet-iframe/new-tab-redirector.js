(function (){
    var links = document.getElementsByTagName('a');

    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function(e) {
            e.preventDefault();
            var redirectWindow = window.open(e.target.href, '_blank');
            redirectWindow.location;
        };
    }
})();