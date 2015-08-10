/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
define(['app'], function (App) {
    CKEDITOR.editorConfig = function (config) {
        // Define changes to default configuration here.
        // For complete reference see:
        // http://docs.ckeditor.com/#!/api/CKEDITOR.config

        // The toolbar groups and items arrangement
        config.toolbar = [
            {
                name: 'basicstyles', items: [
                'Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript', '-', 'RemoveFormat'
            ]
            },
            /*        { name: 'styles', items: [
             'Styles', 'Format', 'Font', 'FontSize'
             ]},*/
            {
                name: 'justify', items: [
                'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'
            ]
            },
            {
                name: 'colors', items: [
                'TextColor', 'BGColor'
            ]
            },
            {
                name: 'paragraph', items: [
                'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent',
            ]
            },
            {
                name: 'insert', items: [
                'Table', 'HorizontalRule', 'Symbol', 'Blockquote',
            ]
            },
            {
                name: 'media', items: [
                'Image', 'CodeSnippet', 'SimpleLink'
            ]
            },
            {
                name: 'tools', items: [
                'Maximize'
            ]
            },
        ];

        // The path for images uploading via modal window
        config.filebrowserImageUploadUrl = App.prefix + '/api/v1/images';
        // By Drag'n'Drop
        config.imageUploadUrl = App.prefix + '/api/v1/images?responceType=json';

        // Remove some buttons provided by the standard plugins, which are
        // not needed in the Standard(s) toolbar.
        //config.removeButtons = 'Underline,Subscript,Superscript';

        // Set the most common block elements.
        config.format_tags = 'p;h1;h2;h3;pre';

        // Simplify the dialog windows.
        config.removeDialogTabs = 'image:advanced;link:advanced';

        // Downloaded skins: icy_orange, minimalist, moono
        config.skin = 'icy_orange';

        // Color of the toolbar (changes '-' placeholders color)
        //config.uiColor = '#f5f5f5';
    };
});