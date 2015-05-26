require(
    [
        'redbuttonhtml/appui/components/cheesecake/adapters/actions/postdata',
        'redbuttonhtml/devices/net/requestmanager',
        'antie/application',
        'antie/widgets/widget',
        'redbuttonhtml/events/dialogeventtypes',
        'redbuttonhtml/appui/components/cheesecake/cheesecakeactions'
    ],
    function (PostData, RequestManager, Application, Widget, DialogEventTypes, CheeseCakeActions) {
        'use strict';

        describe("PostData action", function () {
            var action;
            var widget = new Widget();

            var originalWindowConfig = window.appConfig;
            var functionConstructParams = {
                url: "url.com/%guid%",
                body: {
                    "instruction": "blue-peter-badge"
                },
                options: {
                    fieldName: 'payload',
                    blankUrl: '/none'
                },
                actions: [

                ]
            };

            var lastOptions;

            var mockRequestManager = {
                postData: function (urlArg, parametersBodyArg, parametersOptionsArg) {
                    lastOptions = parametersOptionsArg;
                }
            };

            var createMockAppAndRequestManager = function() {
                var mockApp = sinon.createStubInstance(Application);
                mockApp.getRequestManager = function () {
                    return mockRequestManager;
                };
                mockApp.guid = 123;
                spyOn(Application, 'getCurrentApplication').and.returnValue(mockApp);
            };

            describe("for a single call", function () {
                beforeEach(function () {
                    createMockAppAndRequestManager();
                    action = new PostData(functionConstructParams, widget);
                    spyOn(mockRequestManager, 'postData').and.callThrough();
                });

                afterEach(function () {
                    window.appConfig = originalWindowConfig;
                });

                it("should return a function", function () {
                    expect(action).toEqual(jasmine.any(Function));
                });

                it("should call the request manager to post data when the action is called", function () {
                    action();
                    var expectedUrl = "url.com/123";
                    expect(mockRequestManager.postData).toHaveBeenCalledWith(expectedUrl,
                        functionConstructParams.body, functionConstructParams.options);
                });

            });

            describe("for multiple calls", function () {
                beforeEach(function () {
                    createMockAppAndRequestManager();
                    action = new PostData(functionConstructParams, widget);
                });

                afterEach(function () {
                    window.appConfig = originalWindowConfig;
                });

                it("should prevent multiple post requests (the request manager is called once)", function () {
                    spyOn(mockRequestManager, 'postData').and.callFake(function () {
                        //do nothing with them, simulating a request taking a long time
                    });

                    action();
                    expect(mockRequestManager.postData).toHaveBeenCalled();
                    expect(mockRequestManager.postData.calls.count()).toEqual(1);

                    action();

                    expect(mockRequestManager.postData.calls.count()).toEqual(1);

                });
            });

            describe("for response to PostData requests", function() {

                beforeEach(function () {
                    createMockAppAndRequestManager();
                });

                afterEach(function () {
                    window.appConfig = originalWindowConfig;
                });

                it("should call the correct action on success", function() {
                    var outerFunctionCalled;
                    var innerFunctionCalled;

                    CheeseCakeActions.addAction("testOnSuccess", function(){
                        outerFunctionCalled = true;
                        return function() {
                            innerFunctionCalled = true;
                        };
                    });

                    var parameters = {
                        "url": "http://crb-random-end-point/%guid%",
                        "body": {
                            "instruction": "feel-the-happy"
                        },
                        "actions": [
                            {
                                "eventType": "onSuccess",
                                "command": "testOnSuccess"
                            }
                        ]
                    };

                    action = new PostData(parameters, widget, CheeseCakeActions.getAction);
                    action();

                    lastOptions.onLoad();

                    expect(outerFunctionCalled).toBeTruthy();
                    expect(innerFunctionCalled).toBeTruthy();

                    CheeseCakeActions.removeAction("testOnSuccess");

                });
                it("should call the correct action on error", function() {
                    var outerFunctionCalled;
                    var innerFunctionCalled;
                    var parametersSent;

                    CheeseCakeActions.addAction("testErrorAction", function(parametersArg){
                        outerFunctionCalled = true;
                        return function() {
                            innerFunctionCalled = true;
                            parametersSent = parametersArg;
                        };
                    });

                    var parameters = {
                        "url": "http://crb-random-end-point/%guid%",
                        "body": {
                            "instruction": "feel-the-happy"
                        },
                        "actions": [
                            {
                                "eventType": "onError",
                                "command": "testErrorAction",
                                "parameters": {
                                    "errorCode": "(code:01101)",
                                    "title": "A default preference can't be set at this time",
                                    "description": "This is a temporary problem. Please try again later."
                                }
                            }
                        ]
                    };

                    action = new PostData(parameters, widget, CheeseCakeActions.getAction);
                    action();

                    lastOptions.onError();

                    expect(outerFunctionCalled).toBeTruthy();
                    expect(innerFunctionCalled).toBeTruthy();
                    expect(parametersSent).toBeDefined();

                    CheeseCakeActions.removeAction("testErrorAction");
                });
            });
        });

    }
);