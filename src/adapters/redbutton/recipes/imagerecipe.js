require.def('redbuttonhtml/appui/components/cheesecake/adapters/recipes/imagerecipe',
    [
        'antie/widgets/image',
        'redbuttonhtml/appui/components/cheesecake/utils/recipeutils'
    ],
    function (Image, recipeUtils) {
        'use strict';
        return function (uniqueId, data) {
            var image = new Image(uniqueId, data.source);
            recipeUtils.addCssClasses(image, data.cssClasses);
            return image;
        };
    }
);