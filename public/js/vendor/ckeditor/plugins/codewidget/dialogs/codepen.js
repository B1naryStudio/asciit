(function () {
    CKEDITOR.dialog.add("codepenDialog", function (editor) {
        return {
            allowedContent: "a[href,target]",
            title: "CodePen code snippet",
            minWidth: 550,
            minHeight: 80,
            resizable: CKEDITOR.DIALOG_RESIZE_NONE,
            contents: [{
                id: "CodePen",
                label: "CodePen",
                elements: [    // The only tab
                    {          // Text-field
                        type: "text",
                        id: "snippetURL",
                        label: "URL",
                        validate: function () {
                            // Check link by pattern
                            var reg = new RegExp(
                                /(ftp|http|https):\/\/codepen.io\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
                            );
                            var link = this.getValue();

                            if (!reg.exec(link)) {
                                return editor.lang.codewidget.codePen.urlValidation;
                            }
                        }
                    },
                    {   // Explanation
                        type: "html",
                        html: "<p>" +
                        editor.lang.codewidget.codePen.urlDescription +
                        "</p>"
                    }
                ]
            }],
            onOk: function () {
                var url = this.getValueOf('CodePen', 'snippetURL')
                    .replace("/pen/", "/embed/");

                var iframe = editor.document.createElement('iframe');
                iframe.setAttribute('src', url);
                iframe.setAttribute('class', 'code-snippet codepen ');

                editor.insertElement(iframe);
                var br = editor.document.createElement('br');
                editor.insertElement(br);
            }
        }
    });
})();