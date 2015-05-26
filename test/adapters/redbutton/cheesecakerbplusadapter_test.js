require(
    [
        'redbuttonhtml/appui/components/cheesecake/adapters/cheesecakerbplusadapter',

        'redbuttonhtml/appui/components/cheesecake/adapters/recipes/labelrecipe',
        'redbuttonhtml/appui/components/cheesecake/adapters/recipes/horizontallistrecipe',
        'redbuttonhtml/appui/components/cheesecake/adapters/recipes/verticallistrecipe',
        'redbuttonhtml/appui/components/cheesecake/adapters/recipes/buttonrecipe',
        'redbuttonhtml/appui/components/cheesecake/adapters/recipes/containerrecipe',
        'redbuttonhtml/appui/components/cheesecake/adapters/recipes/imagerecipe',
        'redbuttonhtml/appui/components/cheesecake/adapters/recipes/buttoncontainerrecipe',
        'redbuttonhtml/appui/components/cheesecake/adapters/recipes/carouselrecipe',
        'redbuttonhtml/appui/components/cheesecake/adapters/recipes/imagebuttonrecipe',
        'redbuttonhtml/appui/components/cheesecake/adapters/recipes/videorecipe',

        'redbuttonhtml/appui/components/cheesecake/adapters/actions/navigatetourl',
        'redbuttonhtml/appui/components/cheesecake/adapters/actions/postdata',
        'redbuttonhtml/appui/components/cheesecake/adapters/actions/exitapplication',
        'redbuttonhtml/appui/components/cheesecake/adapters/actions/displayfullscreenoverlay',
        'redbuttonhtml/appui/components/cheesecake/adapters/actions/displayconfirmationdialog',
        'redbuttonhtml/appui/components/cheesecake/adapters/actions/dismiss',
        'redbuttonhtml/appui/components/cheesecake/adapters/actions/returntodefaultsection',
        'redbuttonhtml/appui/components/cheesecake/adapters/actions/createerrordialog',

        'redbuttonhtml/appui/components/cheesecake/adapters/stats/counternametostats'

    ],
    function(cheesecakeSetup, LabelRecipe, HorizontalListRecipe, VerticalListRecipe, ButtonRecipe, ContainerRecipe,
             ImageRecipe, ButtonContainerRecipe, CarouselRecipe, ImageButtonRecipe, VideoRecipe, NavigateToURL, PostData, ExitApplication, DisplayFullScreenOverlay,
             DisplayConfirmationDialog, Dismiss, ReturnToDefaultSection,
             CreateErrorDialog, CounterNameToStats) {
        'use strict';

        describe("cheesecake setup", function() {

            var mockCheeseCakeFactory;

            beforeEach(function() {
                mockCheeseCakeFactory = {
                    addAction : function (uniqueId, action) {

                    },
                    addRecipe : function (uniqueId, recipe) {

                    },
                    addStatsCallFunction : function (statsFunction) {

                    }
                };

                spyOn(mockCheeseCakeFactory, 'addAction');
                spyOn(mockCheeseCakeFactory, 'addRecipe');
                spyOn(mockCheeseCakeFactory, 'addStatsCallFunction');

                cheesecakeSetup.configureFactory(mockCheeseCakeFactory);
            });

            it("should add the correct application actions", function() {

                expect(mockCheeseCakeFactory.addAction.calls.argsFor(0)[0]).toBe('navigatetourl');
                expect(mockCheeseCakeFactory.addAction.calls.argsFor(0)[1]).toBe(NavigateToURL);

                expect(mockCheeseCakeFactory.addAction.calls.argsFor(1)[0]).toBe('post');
                expect(mockCheeseCakeFactory.addAction.calls.argsFor(1)[1]).toBe(PostData);

                expect(mockCheeseCakeFactory.addAction.calls.argsFor(2)[0]).toBe('exitApp');
                expect(mockCheeseCakeFactory.addAction.calls.argsFor(2)[1]).toBe(ExitApplication);

                expect(mockCheeseCakeFactory.addAction.calls.argsFor(3)[0]).toBe('displayfullscreenoverlay');
                expect(mockCheeseCakeFactory.addAction.calls.argsFor(3)[1]).toBe(DisplayFullScreenOverlay);

                expect(mockCheeseCakeFactory.addAction.calls.argsFor(4)[0]).toBe('displayconfirmationdialog');
                expect(mockCheeseCakeFactory.addAction.calls.argsFor(4)[1]).toBe(DisplayConfirmationDialog);

                expect(mockCheeseCakeFactory.addAction.calls.argsFor(5)[0]).toBe('dismiss');
                expect(mockCheeseCakeFactory.addAction.calls.argsFor(5)[1]).toBe(Dismiss);

                expect(mockCheeseCakeFactory.addAction.calls.argsFor(6)[0]).toBe('returnToDefaultSection');
                expect(mockCheeseCakeFactory.addAction.calls.argsFor(6)[1]).toBe(ReturnToDefaultSection);

                expect(mockCheeseCakeFactory.addAction.calls.argsFor(7)[0]).toBe('errorDialog');
                expect(mockCheeseCakeFactory.addAction.calls.argsFor(7)[1]).toBe(CreateErrorDialog);
            });

            it("should add the correct application recipes", function() {
                expect(mockCheeseCakeFactory.addRecipe.calls.argsFor(0)[0]).toBe('label');
                expect(mockCheeseCakeFactory.addRecipe.calls.argsFor(0)[1]).toBe(LabelRecipe);

                expect(mockCheeseCakeFactory.addRecipe.calls.argsFor(1)[0]).toBe('horizontallist');
                expect(mockCheeseCakeFactory.addRecipe.calls.argsFor(1)[1]).toBe(HorizontalListRecipe);

                expect(mockCheeseCakeFactory.addRecipe.calls.argsFor(2)[0]).toBe('verticallist');
                expect(mockCheeseCakeFactory.addRecipe.calls.argsFor(2)[1]).toBe(VerticalListRecipe);

                expect(mockCheeseCakeFactory.addRecipe.calls.argsFor(3)[0]).toBe('container');
                expect(mockCheeseCakeFactory.addRecipe.calls.argsFor(3)[1]).toBe(ContainerRecipe);

                expect(mockCheeseCakeFactory.addRecipe.calls.argsFor(4)[0]).toBe('image');
                expect(mockCheeseCakeFactory.addRecipe.calls.argsFor(4)[1]).toBe(ImageRecipe);

                expect(mockCheeseCakeFactory.addRecipe.calls.argsFor(5)[0]).toBe('carousel');
                expect(mockCheeseCakeFactory.addRecipe.calls.argsFor(5)[1]).toBe(CarouselRecipe);

                expect(mockCheeseCakeFactory.addRecipe.calls.argsFor(6)[0]).toBe('buttoncontainer');
                expect(mockCheeseCakeFactory.addRecipe.calls.argsFor(6)[1]).toBe(ButtonContainerRecipe);

                expect(mockCheeseCakeFactory.addRecipe.calls.argsFor(7)[0]).toBe('button');
                expect(mockCheeseCakeFactory.addRecipe.calls.argsFor(7)[1]).toBe(ButtonRecipe);

                expect(mockCheeseCakeFactory.addRecipe.calls.argsFor(8)[0]).toBe('imagebutton');
                expect(mockCheeseCakeFactory.addRecipe.calls.argsFor(8)[1]).toBe(ImageButtonRecipe);

                expect(mockCheeseCakeFactory.addRecipe.calls.argsFor(9)[0]).toBe('video');
                expect(mockCheeseCakeFactory.addRecipe.calls.argsFor(9)[1]).toBe(VideoRecipe);
            });

            it("should add the correct application stats function", function() {
                expect(mockCheeseCakeFactory.addStatsCallFunction.calls.count()).toBe(1);

                expect(mockCheeseCakeFactory.addStatsCallFunction.calls.argsFor(0)[0]).toBe(CounterNameToStats);
            });

        });
    }
);