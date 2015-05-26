require(
    [
        'redbuttonhtml/appui/components/cheesecake/adapters/actions/exitapplication',
        'antie/application'
    ],
    function (exitApplication, Application) {
        'use strict';
        describe("ExitApplication action", function () {
            it("should call the method that causes the user to exit the application",
                function () {
                    var mockApplication = {
                        exit: function () {
                        }
                    };
                    spyOn(Application, "getCurrentApplication").and.returnValue(mockApplication);
                    spyOn(mockApplication, "exit");

                    var exitApplicationFunction = exitApplication();
                    exitApplicationFunction();

                    expect(mockApplication.exit).toHaveBeenCalled();

                });
        });
    }
);