require(
    [
        "redbuttonhtml/appui/components/cheesecake/adapters/recipes/labelrecipe",
        "antie/widgets/label"
    ],
    function(LabelRecipe, Label) {
        'use strict';

        describe("label recipe", function() {
            var data;
            var id;
            var label;

            beforeEach(function() {
                data = {
                    cssClasses: ["aclass"],
                    text: "lorum ipsum"
                };
                id = "someId";

                label = new LabelRecipe(id, data);
            });

            afterEach(function() {
            });

            it("should return a function", function() {
                expect(LabelRecipe instanceof Function).toBeTruthy();
            });

            it("should when called return a label", function() {
                expect(label instanceof Label).toBeTruthy();
            });

            it("should have the correct css classes on the label", function() {
                expect(label.hasClass(data.cssClasses[0])).toBeTruthy();
            });

            it("should have the correct id on the label", function() {
                expect(label.id).toEqual(id);
            });

            it("should have the correct text on the label", function() {
                expect(label.getText()).toEqual(data.text);
            });

        });
    }
);