require(
    [
        'redbuttonhtml/appui/components/cheesecake/adapters/actions/displayfullscreenoverlay',
        'redbuttonhtml/presenters/overlay/overlaymediator'
    ],
    function (DisplayFullscreenOverlay, OverlayMediator) {
        'use strict';

        describe("display fullscreen overlay action", function () {
            var action;
            var functionConstructParams = {
                url: "url.com"
            };

            var mockOverlayMediator = {
                mockOverlayMediatorClosure: function () {
                    //do nothing
                }
            };

            beforeEach(function () {
                action = new DisplayFullscreenOverlay(functionConstructParams);
                spyOn(mockOverlayMediator, 'mockOverlayMediatorClosure').and.callThrough();
                spyOn(OverlayMediator, 'loadOverlayData').and.callFake(function () {
                    return mockOverlayMediator.mockOverlayMediatorClosure;
                });
            });

            it("should return a function", function () {
                expect(action).toEqual(jasmine.any(Function));
            });

            it("should call the overlay mediator to load the data when the action is called",
                function () {
                    action();
                    expect(OverlayMediator.loadOverlayData).toHaveBeenCalledWith(functionConstructParams.url);
                });

            it("should call the function it gets back from loadOverlayData", function () {
                action();
                expect(mockOverlayMediator.mockOverlayMediatorClosure).toHaveBeenCalled();
            });
        });
    }
)
;