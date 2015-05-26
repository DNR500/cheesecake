require.def('redbuttonhtml/appui/components/cheesecake/adapters/recipes/containerrecipe',
    [
        'antie/widgets/container',
        'redbuttonhtml/appui/components/cheesecake/utils/recipeutils'
    ],
    function (Container, recipeUtils) {
        'use strict';
        return function (uniqueId, data) {
            var container = new Container(uniqueId);
            recipeUtils.addCssClasses(container, data.cssClasses);
            return container;
        };
    }
);