require.def('redbuttonhtml/appui/components/cheesecake/adapters/recipes/buttoncontainerrecipe',
    [
        'antie/widgets/button',
        'redbuttonhtml/appui/components/cheesecake/utils/recipeutils'
    ],
    function (Button, recipeUtils) {
        'use strict';
        return function (uniqueId, data) {
            var button = new Button(uniqueId);
            recipeUtils.addCssClasses(button, data.cssClasses);
            return button;
        };
    }
);