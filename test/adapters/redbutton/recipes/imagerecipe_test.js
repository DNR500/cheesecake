require(
    [
        "redbuttonhtml/appui/components/cheesecake/adapters/recipes/imagerecipe",
        "antie/widgets/image"
    ],
    function(ImageRecipe, Image) {
        'use strict';

        describe("image recipe", function() {
            var data;
            var id;
            var image;

            beforeEach(function() {
                data = {
                    cssClasses: ["aclass"],
                    source: "bbc.co.uk/image.jpg"
                };
                id = "someId";

                image = new ImageRecipe(id, data);
            });

            afterEach(function() {
            });

            it("should return a function", function() {
                expect(ImageRecipe instanceof Function).toBeTruthy();
            });

            it("should when called return an image", function() {
                expect(image instanceof Image).toBeTruthy();
            });

            it("should have the correct css classes on the image", function() {
                expect(image.hasClass(data.cssClasses[0])).toBeTruthy();
            });

            it("should have the correct id on the image", function() {
                expect(image.id).toEqual(id);
            });

            it("should have the correct source on the image", function() {
                expect(image.getSrc()).toEqual(data.source);
            });

        });
    }
);