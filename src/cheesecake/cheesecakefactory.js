require.def('cheesecake/cheesecakefactory',
    [
        'cheesecake/cheesecakerecipes',
        'cheesecake/utils/idutils',
        'cheesecake/cheesecakeactions',
        'cheesecake/utils/recipeutils',
        'cheesecake/cheesecakestats',
        'cheesecake/cheesecakemappings'
    ],
    function ( CheeseCakeRecipes, IdUtils, CheeseCakeActions, RecipeUtils, cheeseCakeStats, cheeseCakeMappings) {
        'use strict';

        return {

            registerPubSub:function (pubSub) {
                this.pubSub = pubSub;
            },

            _isNoneEmptyArray: function (element) {
                return element instanceof Array && element.length > 0;
            },

            _processChildren: function (parent, childrenData, idGenerator) {
                for (var i = 0; i < childrenData.length; i++) {
                    var childWidgetData = childrenData[i];
                    var recipe = CheeseCakeRecipes.getRecipe(childWidgetData.recipeName);

                    var childWidgetId = idGenerator(parent.id);
                    var childWidget = recipe(childWidgetId, childWidgetData, parent, this.pubSub);

                    if (this._isNoneEmptyArray(childWidgetData.children)) {
                        this._processChildren(childWidget, childWidgetData.children,
                            IdUtils.createIdGenerator("child"));
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

                var parentIdGenerator = IdUtils.createIdGenerator("parent");

                this._processChildren(cheeseCakeContainer, data.cheesecake.children, parentIdGenerator);

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
