require.def('redbuttonhtml/appui/components/cheesecake/adapters/recipes/verticallistrecipe',
    [
        'antie/widgets/verticallist',
        'redbuttonhtml/appui/components/cheesecake/utils/recipeutils'
    ],
    function (VerticalList, recipeUtils) {
        'use strict';
        return function (uniqueId, data) {
            var verticalList = new VerticalList(uniqueId);
            recipeUtils.addCssClasses(verticalList, data.cssClasses);
            return verticalList;
        };
    }
);