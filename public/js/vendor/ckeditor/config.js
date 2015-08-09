/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
    // Define changes to default configuration here.
    // For complete reference see:
    // http://docs.ckeditor.com/#!/api/CKEDITOR.config

    config.filebrowserImageUploadUrl = '/ckeditor/pictures'; //TODO: upl backend

    // The toolbar groups arrangement, optimized for two toolbar rows.
    /*
     config.toolbarGroups = [
     { name: 'styles' },
     { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
     { name: 'colors' },
     { name: 'align',       groups: [ 'align'] },
     { name: 'paragraph',   groups: ['list', 'indent', 'blocks'] },
     { name: 'insert', groups: ['Image', 'Table', 'HorizontalRule', 'SpecialChar', 'Maximize']},
     { name: 'forms' },
     { name: 'others' },
     { name: 'document',	   groups: ['document', 'doctools' ] },
     { name: 'tools', groups: [ 'Maximize' ] },
     ];
     */

    config.toolbar = [
        { name: 'basicstyles', items: [
            'Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript', '-', 'RemoveFormat'
        ]},
        /*        { name: 'styles', items: [
         'Styles', 'Format', 'Font', 'FontSize'
         ]},*/
        { name: 'justify', items: [
            'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'
        ]},
        { name: 'colors', items: [
            'TextColor', 'BGColor'
        ]},
        { name: 'paragraph', items: [
            'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent',
        ]},
        { name: 'insert', items: [
            'Table', 'HorizontalRule', 'Symbol', 'Blockquote',
        ]},
        { name: 'media', items: [
            'Image', 'CodeSnippet', 'SimpleLink'
        ]},
        { name: 'tools', items: [
            'Maximize'
        ]},
    ];

    // Remove some buttons provided by the standard plugins, which are
    // not needed in the Standard(s) toolbar.
    //config.removeButtons = 'Underline,Subscript,Superscript';

    // Set the most common block elements.
    config.format_tags = 'p;h1;h2;h3;pre';

    // Simplify the dialog windows.
    config.removeDialogTabs = 'image:advanced;link:advanced';

    // Color of the toolbar
    //config.uiColor = '#f5f5f5';
};
