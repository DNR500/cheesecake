require(
    [
        'redbuttonhtml/appui/components/cheesecake/adapters/actions/returntodefaultsection',
        'antie/application',
        'antie/events/event',
        'redbuttonhtml/events/dialogeventtypes',
        'antie/widgets/widget'
    ],
    function (returnToDefaultSectionAction, Application, Event, DialogEventTypes, Widget) {
        'use strict';
        describe("ReturnToDefaultSection action", function () {

            var rootWidget;
            var application;

            var mockApplicationAndRootWidget = function() {
                application = {
                    getRootWidget : function() {

                    },
                    getCurrentApplication : function() {

                    }
                };
                spyOn(Application, "getCurrentApplication").and.returnValue(application);
                rootWidget = new Widget("mockRoot");
                spyOn(rootWidget, "bubbleEvent");
                spyOn(application, "getRootWidget").and.returnValue(rootWidget);
            };

            it("should fire an event of type returntodefaultsection", function () {
                mockApplicationAndRootWidget();

                var returnToDefaultInnerFunction  = returnToDefaultSectionAction();
                returnToDefaultInnerFunction();

                expect(rootWidget.bubbleEvent).toHaveBeenCalledWith(new Event(DialogEventTypes.returnToDefaultSection));
            });
        });
    }
 );