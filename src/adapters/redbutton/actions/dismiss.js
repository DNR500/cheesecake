require.def('redbuttonhtml/appui/components/cheesecake/adapters/actions/dismiss',
    [
        'antie/events/event'
    ],
    function (Event) {
        'use strict';
        return function (parameters, widget) {
            return function () {
                widget.bubbleEvent(new Event('dismissoverlay'));
            };
        };
    }
);