require(
    [
        "redbuttonhtml/appui/components/cheesecake/adapters/recipes/buttoncontainerrecipe",
        "antie/widgets/button"
    ],
    function(ButtonContainerRecipe, Button) {
        'use strict';

        describe("button recipe", function() {
            var data;
            var id;
            var button;

            beforeEach(function() {
                data = {
                    cssClasses: ["aclass", "bclass"],
                    text: "lorum ipsum"
                };
                id = "someId";

                button = new ButtonContainerRecipe(id, data);
            });

            afterEach(function() {
            });

            it("should return a function", function() {
                expect(ButtonContainerRecipe instanceof Function).toBeTruthy();
            });

            it("should when called return a button", function() {
                expect(button instanceof Button).toBeTruthy();
            });

            it("should have the correct css classes on the button", function() {
                expect(button.hasClass(data.cssClasses[0])).toBeTruthy();
                expect(button.hasClass(data.cssClasses[1])).toBeTruthy();
            });

            it("should have the correct id on the button", function() {
                expect(button.id).toEqual(id);
            });

        });
    }
);