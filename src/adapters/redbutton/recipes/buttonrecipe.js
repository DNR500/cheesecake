require.def('redbuttonhtml/appui/components/cheesecake/adapters/recipes/buttonrecipe',
    [
        'antie/widgets/button',
        'antie/widgets/label',
        'redbuttonhtml/appui/components/cheesecake/utils/recipeutils'
    ],
    function (Button, Label, recipeUtils) {
        'use strict';
        return function (uniqueId, data) {
            var button = new Button(uniqueId);
            recipeUtils.addCssClasses(button, data.cssClasses);
            button.appendChildWidget(new Label(uniqueId + "_label", data.text));
            return button;
        };
    }
);