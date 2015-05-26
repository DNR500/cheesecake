require.def('redbuttonhtml/appui/components/cheesecake/adapters/cheesecakerbplusadapter',
    [
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
    function (LabelRecipe, HorizontalListRecipe, VerticalListRecipe, ButtonRecipe, ContainerRecipe,
              ImageRecipe, ButtonContainerRecipe, CarouselRecipe, ImageButtonRecipe, VideoRecipe, NavigateToURL, PostData, ExitApplication, DisplayFullScreenOverlay,
              DisplayConfirmationDialog, Dismiss, ReturnToDefaultSection,
              CreateErrorDialog, CounterNameToStats) {
        'use strict';

        var addApplicationActions = function (cheesecakeFactory) {
            cheesecakeFactory.addAction("navigatetourl", NavigateToURL); // consider removal
            cheesecakeFactory.addAction('post', PostData);
            cheesecakeFactory.addAction('exitApp', ExitApplication);
            cheesecakeFactory.addAction('displayfullscreenoverlay', DisplayFullScreenOverlay);
            cheesecakeFactory.addAction('displayconfirmationdialog', DisplayConfirmationDialog);
            cheesecakeFactory.addAction('dismiss', Dismiss); // consider renaming to dismissoverlay
            cheesecakeFactory.addAction('returnToDefaultSection', ReturnToDefaultSection);
            cheesecakeFactory.addAction('errorDialog', CreateErrorDialog);
        };

        var addApplicationRecipes = function (cheesecakeFactory) {
            cheesecakeFactory.addRecipe("label", LabelRecipe);
            cheesecakeFactory.addRecipe("horizontallist", HorizontalListRecipe);
            cheesecakeFactory.addRecipe("verticallist", VerticalListRecipe);
            cheesecakeFactory.addRecipe("container", ContainerRecipe);
            cheesecakeFactory.addRecipe("image", ImageRecipe);
            cheesecakeFactory.addRecipe("carousel", CarouselRecipe);
            cheesecakeFactory.addRecipe("buttoncontainer", ButtonContainerRecipe); // consider rename to button
            cheesecakeFactory.addRecipe("button", ButtonRecipe); // consider rename to textbutton
            cheesecakeFactory.addRecipe('imagebutton', ImageButtonRecipe);
            cheesecakeFactory.addRecipe('video', VideoRecipe);
        };

        var addApplicationStatsCall = function (cheesecakeFactory) {
            cheesecakeFactory.addStatsCallFunction(CounterNameToStats);
        };

        return {
            configureFactory: function (cheesecakeFactory) {
                addApplicationActions(cheesecakeFactory);
                addApplicationRecipes(cheesecakeFactory);
                addApplicationStatsCall(cheesecakeFactory);
            }
        };
    }
);
