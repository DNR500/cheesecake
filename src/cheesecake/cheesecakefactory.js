// Cheesecake
// Version 0.0.5

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
                for (var i = 0, len = childrenData.length; i < len; i++) {
                    var childWidget = this._processItem(childrenData[i], parent);

                    if(parent){
                        cheeseCakeMappings.appendChild(parent, childWidget);
                    } else {
                        return childWidget;
                    }
                }
            },

            _processItem: function(childData, parent) {
                var childWidget = this._createFromRecipe(childData, parent);
                this._createChildren(childData, childWidget);
                this._createActions(childData, childWidget);
                return childWidget;
            },

            _createChildren: function(childData, childWidget) {
                if (this._isNoneEmptyArray(childData.children)) {
                    this._processChildren(childWidget, childData.children);
                }
            },

            _createActions: function(childData, childWidget) {
                if (this._isNoneEmptyArray(childData.actions)) {
                    CheeseCakeActions.bindActionsToWidget(childWidget, childData.actions);
                }
            },

            _createFromRecipe: function(childWidgetData, parent) {
                var recipe = CheeseCakeRecipes.getRecipe(childWidgetData.recipeName);
                return recipe(childWidgetData, parent);
            },

            mappings : function() {
                return cheeseCakeMappings;
            },

            createCheeseCake: function (data) {
                return this._processItem(data.cheesecake);
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
