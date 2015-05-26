require.def('redbuttonhtml/appui/components/cheesecake/adapters/recipes/titlerecipe',
    [
        'antie/widgets/label',
        'redbuttonhtml/appui/components/cheesecake/utils/recipeutils'
    ],
    function (Label, recipeUtils) {
        'use strict';
        return function (uniqueId, data) {
            var label = new Label(uniqueId, data.text);
            label.addClass("title");
            recipeUtils.addCssClasses(label, data.cssClasses);
            return label;
        };
    }
);