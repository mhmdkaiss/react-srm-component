(function () {
    const ncmedialibrary = (function () {
        'use strict';
        window.tinymce.PluginManager.add('ncmedialibrary', function (editor) {
            function _onAction() {
                if (editor.mediaLibrary) {
                    editor.mediaLibrary(editor);
                }
            }

            // Define the Toolbar button
            editor.ui.registry.addButton('ncmedialibrary', {
                text: 'NCMedia Library...',
                onAction: _onAction
            });

            // Define the Menu Item
            editor.ui.registry.addMenuItem('ncmedialibrary', {
                text: 'NCMedia Library...',
                context: 'insert',
                onAction: _onAction
            });

            return {
                getMetadata: function () {
                    return {
                        name: 'NCMedia Library',
                        url: 'https://nicecactus.gg'
                    };
                }
            };
        });
    }());
})();
