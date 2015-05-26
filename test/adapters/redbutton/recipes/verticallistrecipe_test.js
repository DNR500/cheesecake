require(
    [
        "redbuttonhtml/appui/components/cheesecake/adapters/recipes/verticallistrecipe",
        "antie/widgets/verticallist"
    ],
    function(VerticalListRecipe, VerticalList) {
        'use strict';

        describe("verticallist recipe", function() {
            var data;
            var id;
            var verticalList;

            beforeEach(function() {
                data = {
                    cssClasses: ["aclass", "bclass"]
                };
                id = "someId";

                verticalList = new VerticalListRecipe(id, data);
            });

            afterEach(function() {
            });

            it("should return a function", function() {
                expect(VerticalListRecipe instanceof Function).toBeTruthy();
            });

            it("should when called return a vertical list", function() {
                expect(verticalList instanceof VerticalList).toBeTruthy();
            });

            it("should have the correct css classes on the vertical list", function() {
                expect(verticalList.hasClass(data.cssClasses[0])).toBeTruthy();
                expect(verticalList.hasClass(data.cssClasses[1])).toBeTruthy();
            });

            it("should have the correct id on the vertical list", function() {
                expect(verticalList.id).toEqual(id);
            });

        });
    }
);