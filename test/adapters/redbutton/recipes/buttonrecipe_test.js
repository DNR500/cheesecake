require(
    [
        "redbuttonhtml/appui/components/cheesecake/adapters/recipes/buttonrecipe",
        "antie/widgets/label",
        "antie/widgets/button"
    ],
    function(ButtonRecipe, Label, Button) {
        'use strict';

        describe("button recipe", function() {
            var data;
            var id;
            var button;

            beforeEach(function() {
                data = {
                    cssClasses: ["aclass"],
                    text: "lorum ipsum"
                };
                id = "someId";

                button = new ButtonRecipe(id, data);
            });

            afterEach(function() {
            });

            it("should return a function", function() {
                expect(ButtonRecipe instanceof Function).toBeTruthy();
            });

            it("should when called return a button", function() {
                expect(button instanceof Button).toBeTruthy();
            });

            it("should feature a child that is a label and contains the correct text", function() {
                var label = button.getChildWidgets()[0];
                expect(label instanceof Label).toBeTruthy();
                expect(label.getText()).toBe("lorum ipsum");
            });

            it("should have the correct css classes on the button", function() {
                expect(button.hasClass(data.cssClasses[0])).toBeTruthy();
            });

            it("should have the correct id on the button", function() {
                expect(button.id).toEqual(id);
            });

        });
    }
);