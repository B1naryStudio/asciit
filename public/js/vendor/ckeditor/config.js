/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
    CKEDITOR.editorConfig = function (config) {
        // Define changes to default configuration here.
        // For complete reference see:
        // http://docs.ckeditor.com/#!/api/CKEDITOR.config

        // The toolbar groups and items arrangement
        config.toolbar = [
            {
                name: 'basicstyles',
                items: [
                    'Bold', 'Italic', 'Underline', 'Strike'
                ]
            },
            {
                name: 'paragraph',
                items: [
                    'NumberedList', 'BulletedList', 'Table', 'HorizontalRule',
                    'Blockquote'
                ]
            },
            {
                name: 'media',
                items: [
                    'Image', 'LinkWithPreview'
                ]
            },
            {
                name: 'code-snippets',
                items: [
                    'CodeSnippet', 'JSFiddle'
                ]
            },
            {
                name: 'tools',
                items: [
                    'Maximize'
                ]
            }
        ];

        config.codeSnippet_languages = {
            actionscript: 'ActionScript',
            apache: 'Apache',
            bash: 'Bash',
            css: 'CSS',
            csharp: 'C#',
            cpp: 'C++',
            coffeescript: 'CoffeeScript',
            dart: 'Dart',
            diff: 'Diff',
            erlang: 'Erlang',
            fortran: 'Fortran',
            haskell: 'Haskell',
            http: 'HTTP',
            html:    'HTML, XML',
            ini: 'Ini',
            x86am: 'Intel x86 Assembly',
            java: 'Java',
            javascript: 'JavaScript',
            json: 'JSON',
            lua: 'Lua',
            lisp: 'Lisp',
            makefile: 'Makefile',
            markdown: 'Markdown',
            nginx: 'Nginx',
            objectivec: 'Objective C',
            oxygene: 'Oxygene',
            php: 'PHP',
            perl: 'Perl',
            python: 'Python',
            prolog: 'Prolog',
            ruby: 'Ruby',
            scala: 'Scala',
            smalltalk: 'Smalltalk',
            SQL: 'SQL',
            swift: 'Swift',
            vim: 'Vim Script'
        };

        // Remove some buttons provided by the standard plugins, which are
        // not needed in the Standard(s) toolbar.
        //config.removeButtons = 'Underline,Subscript,Superscript';

        // Set the most common block elements.
        config.format_tags = 'p;h1;h2;h3;pre';

        // Simplify the dialog windows.
        config.removeDialogTabs = 'image:advanced;link:advanced';

        // Downloaded skins: icy_orange, minimalist, moono
        config.skin = 'icy_orange';

        config.allowedContent = true;
        config.linkwithpreview = {
            url: '/link-preview?url=',
            thumbnailWidth: 200 // px
        };

        // Color of the toolbar (changes '-' placeholders color)
        //config.uiColor = '#f5f5f5';
    };
