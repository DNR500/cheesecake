require(
    [
        "redbuttonhtml/appui/components/cheesecake/cheesecakeactions",
        "redbuttonhtml/appui/components/cheesecake/adapters/actions/navigatetourl",
        "antie/widgets/widget",
        "antie/events/event"
    ],
    function(CheesecakeActions, NavigateToUrl, Widget, Event) {
        'use strict';

        describe("cheesecake actions", function() {

            var parametersArg;
            var widgetArg;
            var getActionFunctionArg;

            var actionForTesting = function(parameters, widget, retrieveAction) {
                return function(){
                    parametersArg = parameters;
                    widgetArg = widget;
                    getActionFunctionArg = retrieveAction;
                };
            };

            beforeEach(function() {
            });

            afterEach(function() {
                parametersArg = undefined;
                widgetArg = undefined;
                getActionFunctionArg = undefined;
            });

            it("should remove actions correctly", function() {
                CheesecakeActions.addAction("navigatetourl", NavigateToUrl);
                CheesecakeActions.removeAction("navigatetourl");
                expect(CheesecakeActions.hasAction("navigatetourl")).toBe(false);
            });

            it("should add actions correctly", function() {
                CheesecakeActions.addAction("hello", NavigateToUrl);
                expect(CheesecakeActions.hasAction("hello")).toBeTruthy();
            });

            it("should pass the widget, parameters and getActions method", function () {
                CheesecakeActions.addAction("testActionArguments", actionForTesting);

                var widgetToBind = new Widget("testWidget");
                var actionData = [
                    {
                        "eventType": "testEvent",
                        "command": "testActionArguments",
                        "parameters": {
                            "some_value": "some non-meaningful value"
                        }
                    }
                ];

                // make sure this is called
                CheesecakeActions.bindActionsToWidget(widgetToBind, actionData);

                widgetToBind.fireEvent(new Event("testEvent"));

                CheesecakeActions.removeAction("testActionArguments");

                expect(parametersArg).toBeDefined();
                expect(widgetArg).toBeDefined();
                expect(getActionFunctionArg).toBeDefined();
                expect(getActionFunctionArg).toBe(CheesecakeActions.getAction);
            });

        });
    }
);