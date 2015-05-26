require.def('redbuttonhtml/appui/components/cheesecake/adapters/actions/navigatetourl',
    [],
    function () {
        'use strict';
        return function (parameters) {
            return function () {
                window.location.href = parameters.url;
            };
        };
    }
);