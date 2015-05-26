require.def('redbuttonhtml/appui/components/cheesecake/adapters/actions/displayconfirmationdialog',
    [
        'redbuttonhtml/presenters/dialog/dialogmediator'
    ],
    function (DialogMediator) {
        'use strict';
        return function (parameters) {
            return function () {
                // TODO: should DialogMediator.createButtonAction really be a closure? (I think not)
                DialogMediator.createButtonCheesecakeAction(parameters.url)();
            };
        };
    }
);