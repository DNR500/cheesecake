require.def('redbuttonhtml/appui/components/cheesecake/adapters/recipes/horizontallistrecipe',
    [
        'antie/widgets/horizontallist',
        'redbuttonhtml/appui/components/cheesecake/utils/recipeutils'
    ],
    function (HorizontalList, recipeUtils) {
        'use strict';
        return function (uniqueId, data) {
            var horizontalList = new HorizontalList(uniqueId);
            recipeUtils.addCssClasses(horizontalList, data.cssClasses);
            return horizontalList;
        };
    }
);