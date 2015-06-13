require.def('mocks/mockadapter',
    [ ],
    function () {
        'use strict';

        var addApplicationActions = function (cheesecakeFactory) {

        };

        var addApplicationRecipes = function (cheesecakeFactory) {

        };

        var addApplicationStatsCall = function (cheesecakeFactory) {

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
