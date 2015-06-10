//require(
//    [
//        "redbuttonhtml/appui/components/cheesecake/cheesecakefactory",
//        "antie/widgets/container",
//        "antie/widgets/label",
//        "antie/application",
//        "antie/widgets/button",
//        "redbuttonhtml/appui/components/cheesecake/adapters/cheesecakerbplusadapter",
//        "redbuttonhtml/appui/components/cheesecake/cheesecakemappings"
//    ],
//    function (CheesecakeFactory, Container, Label, Application, Button, cheeseCakeAdapter, cheeseCakeMappings) {
//        "use strict";
//
//        describe("Cheesecake Factory", function () {
//
//            var value;
//
//            var testUniqueId;
//            var testChildWidgetData;
//            var testParent;
//            var testPubSub;
//
//            var mockPubSub;
//
//            var actionForTesting = function(parameters) {
//                return function(){
//                    value = parameters.some_value;
//                };
//            };
//
//            var recipeForTestingParameters = function(uniqueId, data, parent, pubSub) {
//                testUniqueId = uniqueId;
//                testChildWidgetData = data;
//                testParent = parent;
//                testPubSub = pubSub;
//                return new Label(uniqueId);
//            };
//
//            mockPubSub = {};
//
//            CheesecakeFactory.registerPubSub(mockPubSub);
//            cheeseCakeAdapter.configureFactory(CheesecakeFactory);
//
//            CheesecakeFactory.addAction("customActionForTesting", actionForTesting);
//            CheesecakeFactory.addRecipe("customRecipeForTesting", recipeForTestingParameters);
//
//            var mockApplication = function() {
//                var application = {
//                    getFocussedWidget : function() {
//
//                    },
//                    guid: "SOME-TEST-DEVICE"
//                };
//                spyOn(Application, "getCurrentApplication").and.returnValue(application);
//                spyOn(application, "getFocussedWidget").and.returnValue(null);
//            };
//
//            var cheesecake_ContainerWithButton = {
//                "cheesecake": {
//                    "id": "settingsPanel",
//                    "children": [
//                        {
//                            "recipeName": "button",
//                            "cssClasses": ["title"],
//                            "text": "Some kind of text",
//                            "actions": [
//                                {
//                                    "eventType": "select",
//                                    "command": "customActionForTesting",
//                                    "parameters": {
//                                        "some_value": "parameter passed to action function"
//                                    }
//                                }
//                            ]
//                        }
//                    ]
//                }
//            };
//
//            it("should pass the correct parameters to its recipes", function() {
//                var cheesecake_Label = {
//                    "cheesecake": {
//                        "id": "settingsPanel",
//                        "children": [
//                            {
//                                "recipeName": "customRecipeForTesting",
//                                "randomParam": "some value"
//                            }
//                        ]
//                    }
//                };
//
//                var result = CheesecakeFactory.createCheeseCake(cheesecake_Label);
//
//                expect(testUniqueId).toBe("settingsPanel-parent-0");
//                expect(testChildWidgetData.randomParam).toBe("some value");
//                expect(testParent).toBe(result);
//                expect(testPubSub).toBe(mockPubSub);
//            });
//
//            it("should be able to make a cheesecake from a recipe", function () {
//                var cheesecake_Label = {
//                    "cheesecake": {
//                        "id": "settingsPanel",
//                        "children": [
//                            {
//                                "cssClasses": ["title"],
//                                "recipeName": "label",
//                                "text": "Which service would you like to launch when you press the Red Button?"
//                            }
//                        ]
//                    }
//                };
//                var result = CheesecakeFactory.createCheeseCake(cheesecake_Label);
//                var labelText = cheesecake_Label.cheesecake.children[0].text;
//                var labelCssClass = cheesecake_Label.cheesecake.children[0].cssClasses[0];
//                var label = result.getChildWidgets()[0];
//
//                expect(result.id).toEqual(cheesecake_Label.cheesecake.id);
//                expect(result instanceof Container).toBeTruthy();
//                expect(label instanceof Label).toBeTruthy();
//                expect(label.getText()).toEqual(labelText);
//                expect(label.hasClass(labelCssClass)).toBeTruthy();
//
//            });
//
//            it("should correctly make a cheesecake when the data has grandchildren", function () {
//                var cheesecake_ContainerWithLabel = {
//                    "cheesecake": {
//                        "id": "settingsPanel",
//                        "children": [
//                            {
//                                "recipeName": "container",
//                                "children": [
//                                    {
//                                        "cssClasses": ["title"],
//                                        "recipeName": "label",
//                                        "text": "Which service would you like to launch when you press the Red Button?"
//                                    }
//                                ]
//                            }
//                        ]
//                    }
//                };
//                var result = CheesecakeFactory.createCheeseCake(cheesecake_ContainerWithLabel);
//                var labelText = cheesecake_ContainerWithLabel.cheesecake.children[0].children[0].text;
//                var labelCssClass = cheesecake_ContainerWithLabel.cheesecake.children[0].children[0].cssClasses[0];
//                var innerContainer = result.getChildWidgets()[0];
//                var label = innerContainer.getChildWidgets()[0];
//
//                expect(result.id).toEqual(cheesecake_ContainerWithLabel.cheesecake.id);
//                expect(result instanceof Container).toBeTruthy();
//                expect(innerContainer instanceof Container).toBeTruthy();
//                expect(label instanceof Label).toBeTruthy();
//                expect(label.getText()).toEqual(labelText);
//                expect(label.hasClass(labelCssClass)).toBeTruthy();
//
//            });
//
//            describe("mappings", function() {
//                it("should allow the cheesecake parent contain to be changed", function () {
//                    var cheesecake_ContainerAsButton = {
//                        "cheesecake": {
//                            "id": "settingsPanel",
//                            "children": [
//                                {
//                                    "recipeName": "container",
//                                    "children": [
//                                        {
//                                            "cssClasses": ["title"],
//                                            "recipeName": "label",
//                                            "text": "Which service would you like to launch when you press the Red Button?"
//                                        }
//                                    ]
//                                }
//                            ]
//                        }
//                    };
//
//                    CheesecakeFactory.mappings().setCheeseCakeRecipeName('buttoncontainer');
//                    var result = CheesecakeFactory.createCheeseCake(cheesecake_ContainerAsButton);
//
//                    expect(result instanceof Button).toBeTruthy();
//
//                    CheesecakeFactory.mappings().reset();
//
//                });
//
//                it("should allow the appendChild method on the view to be specified", function () {
//                    var cheesecake_Container = {
//                        "cheesecake": {
//                            "id": "settingsPanel",
//                            "children": [
//                                {
//                                    "recipeName": "container",
//                                    "children": [
//                                        {
//                                            "cssClasses": ["title"],
//                                            "recipeName": "label",
//                                            "text": "Which service would you like to launch when you press the Red Button?"
//                                        }
//                                    ]
//                                }
//                            ]
//                        }
//                    };
//
//                    var functionIsCalled = false;
//
//                    CheesecakeFactory.mappings().setAppendChildFunction(function() {
//                        functionIsCalled = true;
//                    });
//                    var result = CheesecakeFactory.createCheeseCake(cheesecake_Container);
//                    expect(functionIsCalled).toBeTruthy();
//
//                    CheesecakeFactory.mappings().reset();
//
//                });
//
//                it("should allow the addEventListener method on the view to be specified", function () {
//                    mockApplication();
//
//                    var cheesecake_Container = {
//                        "cheesecake": {
//                            "id": "settingsPanel",
//                            "children": [
//                                {
//                                    "recipeName": "button",
//                                    "cssClasses": ["title"],
//                                    "text": "Some kind of text",
//                                    "actions": [
//                                        {
//                                            "eventType": "select",
//                                            "command": "customActionForTesting",
//                                            "parameters": {
//                                                "some_value": "parameter passed to action function"
//                                            }
//                                        }
//                                    ]
//                                }
//                            ]
//                        }
//                    };
//
//                    var functionIsCalled = false;
//
//                    CheesecakeFactory.mappings().setAddEventListenerFunction(function() {
//                        functionIsCalled = true;
//                    });
//                    var result = CheesecakeFactory.createCheeseCake(cheesecake_Container);
//                    expect(functionIsCalled).toBeTruthy();
//
//                    CheesecakeFactory.mappings().reset();
//
//                });
//
//                it("should allow the removeEventListener method on the view to be specified", function () {
//                    mockApplication();
//
//                    var cheesecake_Container = {
//                        "cheesecake": {
//                            "id": "settingsPanel",
//                            "children": [
//                                {
//                                    "recipeName": "button",
//                                    "cssClasses": ["title"],
//                                    "text": "Some kind of text",
//                                    "actions": [
//                                        {
//                                            "eventType": "select",
//                                            "command": "customActionForTesting",
//                                            "parameters": {
//                                                "some_value": "parameter passed to action function"
//                                            }
//                                        }
//                                    ]
//                                }
//                            ]
//                        }
//                    };
//
//                    var functionIsCalled = false;
//
//                    CheesecakeFactory.mappings().setRemoveEventListenerFunction(function() {
//                        functionIsCalled = true;
//                    });
//                    var result = CheesecakeFactory.createCheeseCake(cheesecake_Container);
//                    CheesecakeFactory.unbindCheeseCake(result);
//
//                    expect(functionIsCalled).toBeTruthy();
//
//                    CheesecakeFactory.mappings().reset();
//
//                });
//            });
//
//            describe("action calling", function(){
//                var result;
//                var button;
//
//                beforeEach(function(){
//                    mockApplication();
//
//                    result = CheesecakeFactory.createCheeseCake(cheesecake_ContainerWithButton);
//                    button = result.getChildWidgets()[0];
//                });
//
//                afterEach(function() {
//                    value = undefined;
//                });
//
//                it("should add an action to a cheesecake widget that is executed when the specified event is fired", function () {
//
//                    expect(button instanceof Button).toBeTruthy();
//                    button.select();
//
//                    expect(value).toBe("parameter passed to action function");
//                });
//
//                it("should remove an action the unbindCheeseCake method is called", function () {
//                    CheesecakeFactory.unbindCheeseCake(result);
//
//                    button.select();
//
//                    expect(value).toBeUndefined();
//                });
//            });
//
//            it("should make a stats call when a countername is featured and event is fired then remove stats call on unbind ", function () {
//                mockApplication();
//
//                var counterName;
//
//                var statsCallFunction = function(counterNameStr) {
//                    return function(){
//                        counterName = counterNameStr;
//                    };
//                };
//
//                var cheesecake_ContainerWithButtonAndCountername = {
//                    "cheesecake": {
//                        "id": "settingsPanel",
//                        "children": [
//                            {
//                                "recipeName": "button",
//                                "cssClasses": ["title"],
//                                "text": "Some kind of text",
//                                "actions": [
//                                    {
//                                        "eventType": "select",
//                                        "command": "customActionForTesting",
//                                        "countername": "settings.page.countMe",
//                                        "parameters": {
//                                            "some_value": "parameter passed to action function"
//                                        }
//                                    }
//                                ]
//                            }
//                        ]
//                    }
//                };
//
//                CheesecakeFactory.addStatsCallFunction(statsCallFunction);
//
//                var result = CheesecakeFactory.createCheeseCake(cheesecake_ContainerWithButtonAndCountername);
//                var button = result.getChildWidgets()[0];
//                button.select();
//
//                expect(counterName).toEqual("settings.page.countMe");
//
//                counterName = null;
//
//                CheesecakeFactory.unbindCheeseCake(result);
//                button.select();
//
//                expect(counterName).toBeNull();
//
//                value = undefined;
//            });
//
//            it("should make the options object available via the options method", function () {
//                mockApplication();
//
//                expect(CheesecakeFactory.mappings()).toBe(cheeseCakeMappings);
//
//            });
//
//
//
//        });
//    }
//);