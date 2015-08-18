require(
    [
        "cheesecake/cheesecakefactory",
        "cheesecake/cheesecakemappings",
        "mocks/ui/genericrecipes"
    ],
    function (CheesecakeFactory, cheeseCakeMappings, GenericRecipes) {
        "use strict";

        describe("Cheesecake Factory", function () {

            var actionValue;
            var testUniqueId;
            var testChildWidgetData;
            var testParent;

            var customActionForTesting = function(parameters) {
                return function(){
                    actionValue = parameters.some_value;
                };
            };

            var customRecipeForTesting = function(uniqueId, data, parent) {
                testUniqueId = uniqueId;
                testChildWidgetData = data;
                testParent = parent;
            };

            CheesecakeFactory.addAction("customActionForTesting", customActionForTesting);
            CheesecakeFactory.addRecipe("customRecipeForTesting", customRecipeForTesting);

            CheesecakeFactory.addRecipe("container", GenericRecipes.getContainer());
            CheesecakeFactory.addRecipe("label", GenericRecipes.getLabel());
            CheesecakeFactory.addRecipe("textbutton", GenericRecipes.getTextButton());

            it("should pass the correct parameters to its recipes", function() {
                var cheesecake_Label = {
                    "cheesecake": {
                        "recipeName": "container",
                        "id": "settingsPanel",
                        "children": [
                            {
                                "id": "ourSpecialTestWidget",
                                "recipeName": "customRecipeForTesting",
                                "randomParam": "some value"
                            }
                        ]
                    }
                };

                var result = CheesecakeFactory.createCheeseCake(cheesecake_Label);

                expect(result.id).toBe("settingsPanel");
                expect(testUniqueId).toBe("ourSpecialTestWidget");
                expect(testChildWidgetData.randomParam).toBe("some value");
                expect(testParent).toBe(result);
            });

            it("should be able to make a cheesecake from a recipe", function () {
                var cheesecake_Label = {
                    "cheesecake": {
                        "id": "settingsPanel",
                        "recipeName": "container",
                        "children": [
                            {
                                "cssClasses": ["title"],
                                "recipeName": "label",
                                "text": "Which service would you like to launch when you press the Red Button?"
                            }
                        ]
                    }
                };
                var result = CheesecakeFactory.createCheeseCake(cheesecake_Label);
                var labelText = cheesecake_Label.cheesecake.children[0].text;
                var label = result.childWidgets[0];

                expect(result.id).toEqual(cheesecake_Label.cheesecake.id);
                expect(label.getText()).toEqual(labelText);
                expect(label.cssClasses[0]).toEqual("title");
            });

            it("should correctly make a cheesecake when the data has grandchildren", function () {
                var cheesecake_ContainerWithLabel = {
                    "cheesecake": {
                        "id": "settingsPanel",
                        "recipeName": "container",
                        "children": [
                            {
                                "recipeName": "container",
                                "children": [
                                    {
                                        "cssClasses": ["title"],
                                        "recipeName": "label",
                                        "text": "Which service would you like to launch when you press the Red Button?"
                                    }
                                ]
                            }
                        ]
                    }
                };
                var result = CheesecakeFactory.createCheeseCake(cheesecake_ContainerWithLabel);
                var innerContainer = result.childWidgets[0];
                var label = innerContainer.childWidgets[0];

                expect(result.type).toEqual("container");
                expect(result.childWidgets.length).toEqual(1);

                expect(innerContainer.type).toEqual("container");
                expect(innerContainer.childWidgets.length).toEqual(1);

                expect(label.type).toEqual("label");
                expect(result.id).toEqual(cheesecake_ContainerWithLabel.cheesecake.id);
                expect(label.text).toEqual("Which service would you like to launch when you press the Red Button?");
                expect(label.cssClasses[0]).toEqual("title");
            });

            describe("mappings", function() {
                it("should allow the appendChild method on the view to be specified", function () {
                    var cheesecake_Container = {
                        "cheesecake": {
                            "id": "settingsPanel",
                            "recipeName": "container",
                            "children": [
                                {
                                    "recipeName": "container",
                                    "children": [
                                        {
                                            "recipeName": "label",
                                            "cssClasses": ["title"],
                                            "text": "Which service would you like to launch when you press the Red Button?"
                                        }
                                    ]
                                }
                            ]
                        }
                    };

                    var functionIsCalled = 0;

                    CheesecakeFactory.mappings().setAppendChildFunction(function() {
                        functionIsCalled += 1;
                    });
                    var result = CheesecakeFactory.createCheeseCake(cheesecake_Container);
                    expect(functionIsCalled).toEqual(2);

                    CheesecakeFactory.mappings().reset();
                });

                it("should allow the addEventListener method on the view to be specified", function () {

                    var cheesecake_Container = {
                        "cheesecake": {
                            "id": "settingsPanel",
                            "recipeName": "container",
                            "children": [
                                {
                                    "recipeName": "textbutton",
                                    "cssClasses": ["title"],
                                    "text": "Some kind of text",
                                    "actions": [
                                        {
                                            "eventType": "select",
                                            "command": "customActionForTesting",
                                            "parameters": {
                                                "some_value": "parameter passed to action function"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    };

                    var functionIsCalled = false;

                    CheesecakeFactory.mappings().setAddEventListenerFunction(function() {
                        functionIsCalled = true;
                    });
                    var result = CheesecakeFactory.createCheeseCake(cheesecake_Container);
                    expect(functionIsCalled).toBeTruthy();

                    CheesecakeFactory.mappings().reset();
                });

                it("should allow the getChildren and hasChildren methods on the view to be specified", function () {

                    var cheesecake_Container = {
                        "cheesecake": {
                            "id": "settingsPanel",
                            "recipeName": "container",
                            "children": [
                                {
                                    "recipeName": "textbutton",
                                    "cssClasses": ["title"],
                                    "text": "Some kind of text",
                                    "actions": [
                                        {
                                            "eventType": "select",
                                            "command": "customActionForTesting",
                                            "parameters": {
                                                "some_value": "parameter passed to action function"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    };

                    var getChildrenFunctionIsCalled = false;
                    var hasChildrenFunctionIsCalled = false;

                    CheesecakeFactory.mappings().setGetChildrenFunction(function(widget) {
                        getChildrenFunctionIsCalled = true;
                        return widget.getChildWidgets();
                    });
                    CheesecakeFactory.mappings().setHasChildrenFunction(function(widget) {
                        hasChildrenFunctionIsCalled = true;
                        return widget.getChildWidgets && widget.getChildWidgets().length > 0;
                    });
                    var result = CheesecakeFactory.createCheeseCake(cheesecake_Container);
                    CheesecakeFactory.unbindCheeseCake(result);

                    expect(getChildrenFunctionIsCalled).toBeTruthy();
                    expect(hasChildrenFunctionIsCalled).toBeTruthy();

                    CheesecakeFactory.mappings().reset();
                });

                it("should allow the removeEventListener method on the view to be specified", function () {
                    var cheesecake_Container = {
                        "cheesecake": {
                            "id": "settingsPanel",
                            "recipeName": "container",
                            "children": [
                                {
                                    "recipeName": "textbutton",
                                    "cssClasses": ["title"],
                                    "text": "Some kind of text",
                                    "actions": [
                                        {
                                            "eventType": "select",
                                            "command": "customActionForTesting",
                                            "parameters": {
                                                "some_value": "parameter passed to action function"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    };

                    var functionIsCalled = false;

                    CheesecakeFactory.mappings().setRemoveEventListenerFunction(function() {
                        functionIsCalled = true;
                    });
                    var result = CheesecakeFactory.createCheeseCake(cheesecake_Container);
                    CheesecakeFactory.unbindCheeseCake(result);

                    expect(functionIsCalled).toBeTruthy();

                    CheesecakeFactory.mappings().reset();
                });
            });

            describe("action calling", function(){
                var result;
                var button;

                var cheesecake_ContainerWithButton = {
                    "cheesecake": {
                        "id": "settingsPanel",
                        "recipeName": "container",
                        "children": [
                            {
                                "recipeName": "textbutton",
                                "cssClasses": ["title"],
                                "text": "Some kind of text",
                                "actions": [
                                    {
                                        "eventType": "select",
                                        "command": "customActionForTesting",
                                        "parameters": {
                                            "some_value": "parameter passed to action function"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                };


                it("should add an action to a cheesecake widget that is executed when the specified event is fired and unbind will prevent events firing", function () {
                    result = CheesecakeFactory.createCheeseCake(cheesecake_ContainerWithButton);
                    button = result.getChildWidgets()[0];
                    actionValue = undefined;

                    expect(button.type).toEqual("textbutton");
                    button.select();

                    expect(actionValue).toBe("parameter passed to action function");

                    actionValue = undefined;
                    CheesecakeFactory.unbindCheeseCake(result);

                    button.select();

                    expect(actionValue).toBeUndefined();
                });
            });

            it("should make a stats call when a countername is featured and event is fired then remove stats call on unbind ", function () {
                var counterName;

                var statsCallFunction = function(counterNameStr) {
                    return function(){
                        counterName = counterNameStr;
                    };
                };

                var cheesecake_ContainerWithButtonAndCountername = {
                    "cheesecake": {
                        "id": "settingsPanel",
                        "recipeName": "container",
                        "children": [
                            {
                                "recipeName": "textbutton",
                                "cssClasses": ["title"],
                                "text": "Some kind of text",
                                "actions": [
                                    {
                                        "eventType": "select",
                                        "command": "customActionForTesting",
                                        "countername": "settings.page.countMe",
                                        "parameters": {
                                            "some_value": "parameter passed to action function"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                };

                CheesecakeFactory.addStatsCallFunction(statsCallFunction);

                var result = CheesecakeFactory.createCheeseCake(cheesecake_ContainerWithButtonAndCountername);

                var button = result.getChildWidgets()[0];
                button.select();

                expect(counterName).toEqual("settings.page.countMe");

                counterName = null;

                CheesecakeFactory.unbindCheeseCake(result);
                button.select();

                expect(counterName).toBeNull();

                actionValue = undefined;
            });

            it("should make the options object available via the options method", function () {
                expect(CheesecakeFactory.mappings()).toBe(cheeseCakeMappings);
            });
        });
    }
);