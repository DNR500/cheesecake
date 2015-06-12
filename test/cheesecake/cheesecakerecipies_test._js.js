require(
    [
        "cheesecake/cheesecakerecipes"
    ],
    function (CheesecakeRecipies) {
        "use strict";

        describe("Cheesecake Recipes", function () {

            var aDoNothingFunction;

                beforeEach(function(){
                    aDoNothingFunction = function(){
                        return function() {

                        };
                    }
                    CheesecakeRecipies.addRecipe("aName", aDoNothingFunction);
                });

                afterEach(function() {
                    CheesecakeRecipies.reset();
                    aDoNothingFunction = null;
                });

            it("should be able to add a recipe", function () {
                expect(CheesecakeRecipies.hasRecipe("aName")).toBeTruthy();
                expect(CheesecakeRecipies.getRecipe("aName")).toBe(aDoNothingFunction);
            });

            it("should be able to add a remove recipe", function () {
                CheesecakeRecipies.removeRecipe("aName")
                expect(CheesecakeRecipies.hasRecipe("aName")).toBeFalsy();
            });

            it("should be able to reset", function () {
                CheesecakeRecipies.reset();
                expect(CheesecakeRecipies.hasRecipe("aName")).not.toBeTruthy();
            });
        });
    }
);