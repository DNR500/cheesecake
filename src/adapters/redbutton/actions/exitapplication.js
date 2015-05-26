require.def('redbuttonhtml/appui/components/cheesecake/adapters/actions/exitapplication',
    [
        'antie/application'
    ],
    function (Application) {
        'use strict';
        return function () {
            return function () {
                Application.getCurrentApplication().exit();
            };
        };
    }
);