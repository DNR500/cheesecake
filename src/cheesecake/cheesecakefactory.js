require.def('cheesecake/cheesecakefactory',
    [
        'cheesecake/cheesecakerecipes',
        'cheesecake/cheesecakeactions',
        'cheesecake/utils/recipeutils',
        'cheesecake/cheesecakestats',
        'cheesecake/cheesecakemappings'
    ],
    function ( CheeseCakeRecipes, CheeseCakeActions, RecipeUtils, cheeseCakeStats, cheeseCakeMappings) {
        'use strict';

        return {

            _isNoneEmptyArray: function (element) {
                return element instanceof Array && element.length > 0;
            },

            _processChildren: function (parent, childrenData) {
                for (var i = 0; i < childrenData.length; i++) {
                    var childWidgetData = childrenData[i];
                    var recipe = CheeseCakeRecipes.getRecipe(childWidgetData.recipeName);

                    var childWidgetId = childWidgetData.id || undefined;
                    var childWidget = recipe(childWidgetId, childWidgetData, parent);

                    if (this._isNoneEmptyArray(childWidgetData.children)) {
                        this._processChildren(childWidget, childWidgetData.children);
                    }
                    if (this._isNoneEmptyArray(childWidgetData.actions)) {
                        CheeseCakeActions.bindActionsToWidget(childWidget,
                            childWidgetData.actions);
                    }

                    cheeseCakeMappings.appendChild(parent, childWidget);
                }
            },

            mappings : function() {
                return cheeseCakeMappings;
            },

            createCheeseCake: function (data) {
                var cheeseCakeId = data.cheesecake.id ? data.cheesecake.id : "cheesecake";
                data.cheesecake.cssClasses = data.cheesecake.cssClasses ? data.cheesecake.cssClasses.unshift(cheeseCakeId):[cheeseCakeId];

                var recipe = CheeseCakeRecipes.getRecipe(cheeseCakeMappings.cheeseCakeRecipeName());
                var cheeseCakeContainer = recipe(cheeseCakeId, data.cheesecake);

                this._processChildren(cheeseCakeContainer, data.cheesecake.children);

                return cheeseCakeContainer;
            },

            addRecipe: function (uniqueId, recipe) {
                CheeseCakeRecipes.addRecipe(uniqueId, recipe);
            },

            addAction: function (uniqueId, action) {
                CheeseCakeActions.addAction(uniqueId, action);
            },

            addStatsCallFunction: function(statsFunction) {
                cheeseCakeStats.addStatsCallFunction(statsFunction);
            },

            unbindCheeseCake: function (cheesecakeContainer) {
                CheeseCakeActions.unbindCheeseCake(cheesecakeContainer);
            }

        };
    }
);
