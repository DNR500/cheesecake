require(
    [
        "redbuttonhtml/appui/components/cheesecake/adapters/recipes/carouselrecipe",
        "antie/widgets/carousel",
        "antie/application"
    ],
    function(CarouselRecipe, Carousel, Application) {
        'use strict';

        describe("carousel recipe", function() {
            var data;
            var id;
            var carousel;

            var setupDataForTest = function(orient) {

                var application = {
                    getDevice : function() {

                    },
                    guid: "SOME-TEST-DEVICE"
                };
                spyOn(application, "getDevice").and.returnValue({});
                spyOn(Application, "getCurrentApplication").and.returnValue(application);

                data = {
                    "recipeName": "carousel",
                    "cssClasses": ["some-css-thing", "another-css-thing"],
                    "orientation": orient
                };
                id = "someId";

                carousel = new CarouselRecipe(id, data);
            };

            it("should return a function", function() {
                setupDataForTest();
                expect(CarouselRecipe instanceof Function).toBeTruthy();
            });

            it("should when called return a carousel", function() {
                setupDataForTest();
                expect(carousel instanceof Carousel).toBeTruthy();
            });

            it("should have the correct css classes on the carousel", function() {
                setupDataForTest();
                expect(carousel.hasClass(data.cssClasses[0])).toBeTruthy();
                expect(carousel.hasClass(data.cssClasses[1])).toBeTruthy();
            });

            it("should have the correct id on the carousel", function() {
                setupDataForTest();
                expect(carousel.id).toEqual(id);
            });

            it("should have a horizontal orientation when it is specified", function() {
                setupDataForTest("horizontal");
                expect(carousel.orientation()).toBe(Carousel.orientations.HORIZONTAL);
            });

            it("should have a vertical orientation when it is specified", function() {
                setupDataForTest("vertical");
                expect(carousel.orientation()).toBe(Carousel.orientations.VERTICAL);
            });

            it("should have a vertical orientation as default", function() {
                setupDataForTest();
                expect(carousel.orientation()).toBe(Carousel.orientations.VERTICAL);
            });

        });
    }
);