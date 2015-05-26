require.def('redbuttonhtml/appui/components/cheesecake/adapters/recipes/carouselrecipe',
    [
        'antie/widgets/carousel',
        'redbuttonhtml/appui/components/cheesecake/utils/recipeutils'
    ],
    function (Carousel, recipeUtils) {
        'use strict';
        return function (uniqueId, data) {
            var orientation = (data.orientation === "horizontal") ? Carousel.orientations.HORIZONTAL : Carousel.orientations.VERTICAL;
            var carousel = new Carousel(uniqueId, orientation);
            recipeUtils.addCssClasses(carousel, data.cssClasses);
            return carousel;
        };
    }
);