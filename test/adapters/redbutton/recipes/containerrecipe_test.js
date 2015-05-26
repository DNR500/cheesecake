require(
    [
        "redbuttonhtml/appui/components/cheesecake/adapters/recipes/containerrecipe",
        "antie/widgets/container"
    ],
    function(ContainerRecipe, Container) {
        'use strict';

        describe("container recipe", function() {
            var data;
            var id;
            var container;

            beforeEach(function() {
                data = {
                    cssClasses: ["aclass"]
                };
                id = "someId";

                container = new ContainerRecipe(id, data);
            });

            afterEach(function() {
            });

            it("should return a function", function() {
                expect(ContainerRecipe instanceof Function).toBeTruthy();
            });

            it("should when called return a container", function() {
                expect(container instanceof Container).toBeTruthy();
            });

            it("should have the correct css classes on the container", function() {
                expect(container.hasClass(data.cssClasses[0])).toBeTruthy();
            });

            it("should have the correct id on the container", function() {
                expect(container.id).toEqual(id);
            });

        });
    }
);