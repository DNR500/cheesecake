require.def('redbuttonhtml/appui/components/cheesecake/adapters/actions/displayfullscreenoverlay',
    [
        'redbuttonhtml/presenters/overlay/overlaymediator'
    ],
    function (OverlayMediator) {
        'use strict';

        return function (parameters) {
            return function () {
                // TODO: Question whether we should be validating parameters at this point in our code?
                // TODO: Should OverlayMediator.loadOverlayData should really be a closure? (I think not)
                OverlayMediator.loadOverlayData(parameters.url)();
            };
        };
    }
);