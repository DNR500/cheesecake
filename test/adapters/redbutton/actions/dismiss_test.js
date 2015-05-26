require(
    [
        'redbuttonhtml/appui/components/cheesecake/adapters/actions/dismiss',
        'antie/widgets/widget',
        'antie/events/event'

    ],
    function (Dismiss, Widget, Event) {
        'use strict';

        describe("Dismiss cheesecake action", function () {
            var action;
            var widget = new Widget();

            var mockBubble = function (param){
            };

            beforeEach(function () {
                action = new Dismiss("someParam", widget);
                spyOn(widget, 'bubbleEvent').and.callFake(mockBubble);

            });

            it("should return a function", function () {
                expect(action).toEqual(jasmine.any(Function));
            });

            it("should call bubbleEvent with dismissoverlay when the action is called",
                function () {
                    action();
                    expect(widget.bubbleEvent).toHaveBeenCalledWith(new Event('dismissoverlay'));
                });
        });
    }
);