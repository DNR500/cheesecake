require.def('cheesecake/utils/recipeutils',
    [],
    function () {
        'use strict';
        return {
            addCssClasses: function (widget, cssClasses) {
                if (cssClasses && cssClasses.length > 0) {
                    for (var i = 0; i < cssClasses.length; i++) {
                        widget.addClass(cssClasses[i]);
                    }
                }
            }
        };
    }
);