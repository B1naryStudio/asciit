(function () {
    CKEDITOR.dialog.add("jsfiddleDialog", function (editor) {
        return {
            allowedContent: "a[href,target]",
            title: "JSFIDDLE code snippet",
            minWidth: 550,
            minHeight: 80,
            resizable: CKEDITOR.DIALOG_RESIZE_NONE,
            contents: [{
                id: "JSFiddle",
                label: "JSFiddle",
                elements: [    // The only tab
                    {          // Text-field
                        type: "text",
                        id: "snippetURL",
                        label: "URL",
                        validate: CKEDITOR.dialog.validate.regex(
                            /(ftp|http|https):\/\/jsfiddle.net\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
                            editor.lang.codewidget.jsFiddle.urlValidation
                        )
                    },
                    {   // Explanation
                        type: "html",
                        html: "<p>" +
                              editor.lang.codewidget.jsFiddle.urlDescription +
                              "</p>"
                    }
                ]
            }],
            onOk: function () {
                var url = this.getValueOf('JSFiddle', 'snippetURL') +
                    'embedded/';

                var iframe = editor.document.createElement('iframe');
                iframe.setAttribute('src', url);
                iframe.setAttribute('class', 'code-snippet jsfiddle ');

                editor.insertElement(iframe);
            }
        }
    });
})();