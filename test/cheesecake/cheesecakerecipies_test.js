require(
    [
        "redbuttonhtml/appui/components/cheesecake/cheesecakerecipes"
    ],
    function (CheesecakeRecipies) {
        "use strict";

        describe("Cheesecake Recipes", function () {

            it("should be able to add a recipe", function () {

                var aDoNothingFunction = function () {
                };
                CheesecakeRecipies.addRecipe("aName", aDoNothingFunction);
                expect(CheesecakeRecipies.hasRecipe("aName")).toBeTruthy();
                expect(CheesecakeRecipies.getRecipe("aName")).toBe(aDoNothingFunction);
            });

            it("should be able to reset", function () {
                CheesecakeRecipies.addRecipe("label", function(){
                    return function() {

                    };
                });
                expect(CheesecakeRecipies.hasRecipe("label")).toBeTruthy();

                CheesecakeRecipies.reset();
                expect(CheesecakeRecipies.hasRecipe("label")).not.toBeTruthy();
            });
        });
    }
);