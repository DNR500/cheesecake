require.def('redbuttonhtml/appui/components/cheesecake/adapters/actions/returntodefaultsection',
    [
        'antie/application',
        'antie/events/event',
        'redbuttonhtml/events/dialogeventtypes'
    ],
    function (Application, Event, DialogEventTypes) {
        'use strict';
        return function () {
            return function () {
                Application.getCurrentApplication().getRootWidget().bubbleEvent(new Event(DialogEventTypes.returnToDefaultSection));
            };
        };
    }
);