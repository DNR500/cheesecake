require(
    [
        'redbuttonhtml/appui/components/cheesecake/adapters/actions/displayconfirmationdialog',
        'redbuttonhtml/presenters/dialog/dialogmediator'
    ],
    function (DisplayConfirmationDialog, DialogMediator) {
        'use strict';

        describe("display dialog action", function () {
            var action;
            var functionConstructParams = {
                url: "url.com"
            };


            var mockDialogMediator = {
                mockDialogMediatorClosure: function () {
                    //do nothing
                }
            };

            beforeEach(function () {
                action = new DisplayConfirmationDialog(functionConstructParams);
                spyOn(mockDialogMediator, 'mockDialogMediatorClosure').and.callThrough();
                spyOn(DialogMediator, 'createButtonCheesecakeAction').and.callFake(function () {
                    return mockDialogMediator.mockDialogMediatorClosure;
                });
            });

            it("should return a function", function () {
                expect(action).toEqual(jasmine.any(Function));
            });

            it("should call the dialog mediator to create a button action when the action is called", function () {
                action();
                expect(DialogMediator.createButtonCheesecakeAction).toHaveBeenCalledWith(functionConstructParams.url);
            });

            it("should call the function it gets back from createButtonAction", function () {
                action();
                expect(mockDialogMediator.mockDialogMediatorClosure).toHaveBeenCalled();
            });
        });
    }
);