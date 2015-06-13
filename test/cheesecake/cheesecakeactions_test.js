require(
    [
        "cheesecake/cheesecakeactions",
        "mocks/ui/widget"
    ],
    function(CheesecakeActions, Widget) {
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
                CheesecakeActions.addAction("testAction", actionForTesting);
                CheesecakeActions.removeAction("testAction");
                expect(CheesecakeActions.hasAction("testAction")).toBe(false);
            });

            it("should add actions correctly", function() {
                CheesecakeActions.addAction("hello", actionForTesting);
                expect(CheesecakeActions.hasAction("hello")).toBeTruthy();
            });

            it("should pass the widget, parameters and getActions method", function () {
                CheesecakeActions.addAction("testActionArguments", actionForTesting);

                var widgetToBind = new Widget();
                var actionData = [
                    {
                        "eventType": "testEvent",
                        "command": "testActionArguments",
                        "parameters": {
                            "some_value": "some non-meaningful value"
                        }
                    }
                ];

                CheesecakeActions.bindActionsToWidget(widgetToBind, actionData);

                widgetToBind.fireEvent("testEvent");

                CheesecakeActions.removeAction("testActionArguments");

                expect(parametersArg).toBeDefined();
                expect(widgetArg).toBeDefined();
                expect(getActionFunctionArg).toBeDefined();
                expect(getActionFunctionArg).toBe(CheesecakeActions.getAction);
            });

        });
    }
);