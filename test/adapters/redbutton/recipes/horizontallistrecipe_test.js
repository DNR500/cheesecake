require(
    [
        "redbuttonhtml/appui/components/cheesecake/adapters/recipes/horizontallistrecipe",
        "antie/widgets/horizontallist"
    ],
    function(HorizontalListRecipe, HorizontalList) {
        'use strict';

        describe("horizontallist recipe", function() {
            var data;
            var id;
            var horizontalList;

            beforeEach(function() {
                data = {
                    cssClasses: ["aclass", "bclass"]
                };
                id = "someId";

                horizontalList = new HorizontalListRecipe(id, data);
            });

            afterEach(function() {
            });

            it("should return a function", function() {
                expect(HorizontalListRecipe instanceof Function).toBeTruthy();
            });

            it("should when called return a horizontal list", function() {
                expect(horizontalList instanceof HorizontalList).toBeTruthy();
            });

            it("should have the correct css classes on the horizontal list", function() {
                expect(horizontalList.hasClass(data.cssClasses[0])).toBeTruthy();
                expect(horizontalList.hasClass(data.cssClasses[1])).toBeTruthy();
            });

            it("should have the correct id on the horizontal list", function() {
                expect(horizontalList.id).toEqual(id);
            });

        });
    }
);