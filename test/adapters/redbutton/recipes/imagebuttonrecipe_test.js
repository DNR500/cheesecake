require(
    [
        "redbuttonhtml/appui/components/cheesecake/adapters/recipes/imagebuttonrecipe",
        "antie/application",
        "antie/devices/device",
        "antie/events/focusevent",
        "antie/events/blurevent",
        "antie/widgets/label",
        "antie/widgets/image",
        "antie/widgets/container",
        "redbuttonhtml/appui/widgets/imagebutton"
    ],
    function(ImageButtonRecipe, Application, Device, FocusEvent, BlurEvent, Label, Image, Container, ImageButton) {
        'use strict';

        var logger = {
            error: function(e) {
            }
        };

        describe("image button recipe", function() {
            var data;
            var id;
            var button;
            var parent;
            var sandbox;
            var clock;
            var metrics = {
                imageButton: {
                    contractedSize: {
                        height: 160,
                        width: 282
                    },
                    expandedSize: {
                        height: 162,
                        width: 293
                    },
                    animationDuration: 100
                },
                imageButtonLeft :  {
                    moveTo: {
                        top: -5,
                        left: 35
                    },
                    moveFrom: {
                        top: 0,
                        left: 35
                    }
                },
                imageButtonRight :  {
                    moveTo: {
                        top: -5,
                        left: 340
                    },
                    moveFrom: {
                        top: 0,
                        left: 353
                    }
                }
            };

            beforeEach(function () {
                sandbox = sinon.sandbox.create();
                clock = sinon.useFakeTimers();
                var application = sinon.createStubInstance(Application);
                var device = sinon.createStubInstance(Device);
                spyOn(device, 'getLogger').and.returnValue(logger);
                spyOn(application, 'getDevice').and.returnValue(device);
                spyOn(application, 'getLayout').and.returnValue({metrics:metrics});
                spyOn(device, 'tweenElementStyle').and.callFake(function (opts) {
                    opts.onComplete();
                });

                sandbox.stub(Application, "getCurrentApplication").returns(application);

                data = {
                    "text": "RED BUTTON+",
                    "source": {
                        "active": "http: //static.test.bbci.co.uk/redbuttonstatic/latest/img/settings/Toggle_CRB.jpg",
                        "inactive": "http: //static.test.bbci.co.uk/redbuttonstatic/latest/img/settings/Toggle_CRB.jpg"
                    },
                    "selected": true
                };
                id = "someId";

                parent = new Container();

                button = new ImageButtonRecipe(id, data, parent);
            });

            afterEach(function () {
                sandbox.restore();
            });

            it("should be a function", function () {
                expect(ImageButtonRecipe instanceof Function).toBeTruthy();
            });


            describe("calling ImageButtonRecipe(/*args*/)", function () {
                it("should return an imagebutton", function () {
                    expect(button instanceof ImageButton).toBeTruthy();
                });

            });

            describe("events", function () {
                it("should have the class expanded and not have the class contracted when it has focus", function () {
                    var focusevent = new FocusEvent(button);
                    button.bubbleEvent(focusevent);
                    clock.tick(200);
                    expect(button.hasClass('expanded')).toBeTruthy();
                    expect(button.hasClass('contracted')).not.toBeTruthy();
                });

                it("should have the class contracted and not have the class expanded when it loses focus", function () {
                    var focusevent = new FocusEvent(button);
                    button.bubbleEvent(focusevent);
                    expect(button.hasClass('expanded')).toBeTruthy();

                    var blurevent = new BlurEvent(button);
                    button.bubbleEvent(blurevent);
                    clock.tick(100);
                    expect(button.hasClass('contracted')).toBeTruthy();
                    expect(button.hasClass('expanded')).not.toBeTruthy();
                });
            });

            describe("tick box", function () {
                it("should have the class selected if selected in the data is true", function () {
                    expect(button.hasClass('selected')).toBeTruthy();
                });
                it("should not have the class selected if selected in the data is false", function () {
                    data.selected = false;
                    button = new ImageButtonRecipe(id, data, parent);
                    expect(button.hasClass('selected')).not.toBeTruthy();
                });
            });

        });
    }
);