require.def('redbuttonhtml/appui/components/cheesecake/adapters/recipes/videorecipe',
    [
        'antie/widgets/componentcontainer',
        'redbuttonhtml/presenters/etv/videoplayermediator',
        'redbuttonhtml/appui/components/cheesecake/utils/recipeutils'
    ],
    function (ComponentContainer, VideoPlayerMediator, recipeUtils) {
        'use strict';
        return function (uniqueId, data, parent, pubSub) {
            var videoPlayerContainer = new ComponentContainer(uniqueId);
            recipeUtils.addCssClasses(videoPlayerContainer, data.cssClasses);
            var videoPlayerMediator = new VideoPlayerMediator(videoPlayerContainer, pubSub, data.vpid);
            videoPlayerContainer.killVideo = function() {
                videoPlayerMediator.destroy();
            };
            return videoPlayerContainer;
        };
    }
);