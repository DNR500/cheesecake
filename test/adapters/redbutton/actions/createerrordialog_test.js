require(
    [
        'redbuttonhtml/appui/components/cheesecake/adapters/actions/createerrordialog',
        'redbuttonhtml/services/errorhandlingservice'
    ],
    function (createErrorDialog, ErrorHandlingService) {
        'use strict';
        describe("CreateErrorDialog action", function () {
            it("should pass error details to the ErrorHandlingService", function () {
                spyOn(ErrorHandlingService, 'handleCustomRecoverableError');

                var errorDetails = {
                    "errorCode": "(code:01101)",
                    "title": "A default preference can't be set at this time",
                    "description": "This is a temporary problem. Please try again later.",
                    "countername": "settings.error.page.crb.dismiss"
                };

                var createErrorDialogFunction  = createErrorDialog(errorDetails);
                createErrorDialogFunction();

                expect(ErrorHandlingService.handleCustomRecoverableError).toHaveBeenCalledWith(errorDetails);

            });
        });
    }
);