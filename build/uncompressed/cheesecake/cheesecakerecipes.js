require.def('cheesecake/cheesecakerecipes',
    [ ],
    function () {
        'use strict';

        var recipes = {};

        return {
            hasRecipe: function (name) {
                return recipes[name] ? true : false;
            },

            addRecipe: function (name, buildFunction) {
                recipes[name] = buildFunction;
            },

            removeRecipe: function (name) {
                if (this.hasRecipe(name)) {
                    recipes[name] = null;
                }
            },

            getRecipe: function (name) {
                if(this.hasRecipe(name)) {
                    return recipes[name];
                }
                throw "Cheesecake recipe:" + name + " not found";
            },

            reset: function () {
                for (var recipe in recipes) {
                    if (recipes.hasOwnProperty(recipe)) {
                        this.removeRecipe(recipe);
                    }
                }
                recipes = {};
            }
        };
    }
);
