(function () {
    CKEDITOR.dialog.add("pastebinDialog", function (editor) {
        return {
            allowedContent: "a[href,target]",
            title: "Pastebin code snippet",
            minWidth: 550,
            minHeight: 80,
            resizable: CKEDITOR.DIALOG_RESIZE_NONE,
            contents: [{
                id: "Pastebin",
                label: "Pastebin",
                elements: [    // The only tab
                    {          // Text-field
                        type: "text",
                        id: "snippetURL",
                        label: "URL",
                        validate: CKEDITOR.dialog.validate.regex(
                            /(ftp|http|https):\/\/pastebin.com\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
                            editor.lang.codewidget.Pastebin.urlValidation
                        )
                    },
                    {   // Explanation
                        type: "html",
                        html: "<p>" +
                              editor.lang.codewidget.Pastebin.urlDescription +
                              "</p>"
                    }
                ]
            }],
            onOk: function () {
                var pastebinId = this.getValueOf('Pastebin', 'snippetURL')
                    .slice(-9)
                    .replace('\/', '');
                var url = 'http://pastebin.com/embed_iframe.php?i=' +
                          pastebinId;

                var iframe = editor.document.createElement('iframe');
                iframe.setAttribute('src', url);
                iframe.setAttribute('class', 'code-snippet pastebin ');

                editor.insertElement(iframe);
                var br = editor.document.createElement('br');
                editor.insertElement(br);
            }
        }
    });
})();