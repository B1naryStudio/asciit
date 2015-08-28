require(['app', 'jquery', 'jquery.scroll'], function (App) {
    jQuery.extend(jQuery.fn, {
        toplinkwidth: function () {
            var totalContentWidth = jQuery('#page-content-wrapper').outerWidth();
            var totalTopLinkWidth = jQuery('#top-link')
                .children('a')
                .outerWidth(true);
            var h = jQuery(window).width() / 2 -
                totalContentWidth / 2 - totalTopLinkWidth;

            if (
                h < 0 ||
                document.body.offsetHeight <= window.innerHeight
            ) {
                jQuery(this).hide();
            } else {
                if (jQuery(window).scrollTop() >= 1) {
                    jQuery(this).show();
                }
            }
        }
    });

    jQuery(function($) {
        var topLink = $('#top-link');
        topLink.toplinkwidth();
        $(window).resize(function() {
            topLink.toplinkwidth();
        });
        $(window).scroll(function() {
            if ($(window).scrollTop() >= 1) {
                topLink
                    .fadeIn(300)
                    .children('a')
                    .html('<span id="topicon"></span>' + i18n.t('ui.up'))
                    .parent()
                    .removeClass('bottom_button')
                    .addClass('top_button');
            } else {
                topLink
                    .children('a')
                    .html('<span id="backicon"></span>'  + i18n.t('ui.down'))
                    .parent()
                    .removeClass('top_button')
                    .addClass('bottom_button');
            }
        });
        topLink.click(function (e) {
            if ($(this).hasClass('bottom_button')) {
                if (pos) {
                    $('body').scrollTo(pos + 'px', 500);
                }
            } else {
                pos = (window.pageYOffset !== undefined) ?
                    window.pageYOffset :
                    (
                        document.documentElement ||
                        document.body.parentNode ||
                        document.body
                    ).scrollTop;
                $('body,html').animate({scrollTop: 0},500);
            }
            return false;
        });
    });
});
