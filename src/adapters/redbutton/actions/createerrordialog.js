require.def('redbuttonhtml/appui/components/cheesecake/adapters/actions/createerrordialog',
    [
        'redbuttonhtml/services/errorhandlingservice'
    ],
    function (ErrorHandlingService) {
        'use strict';
        return function (errorDetails) {
            return function () {
                ErrorHandlingService.handleCustomRecoverableError(errorDetails);
            };
        };
    }
);