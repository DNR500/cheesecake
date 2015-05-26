require(
    [
        "redbuttonhtml/appui/components/cheesecake/adapters/recipes/videorecipe",
        "antie/widgets/componentcontainer",
        "redbuttonhtml/presenters/etv/videoplayermediator"
    ],
    function(VideoRecipe, ComponentContainer, VideoPlayerMediator) {
        'use strict';

        describe("video recipe", function() {
            var data;
            var id;
            var videoContainer;
            var mockPubSub;

            beforeEach(function() {
                data = {
                    cssClasses: ["aclass"],
                    vpid: "someVpid"
                };
                id = "someId";
                mockPubSub = {};

                spyOn(VideoPlayerMediator.prototype, "init");
                spyOn(VideoPlayerMediator.prototype, "destroy");

                videoContainer = new  VideoRecipe(id, data, null, mockPubSub);
            });

            afterEach(function() {
            });

            it("should return a function", function() {
                expect(VideoRecipe instanceof Function).toBeTruthy();
            });

            it("should when called return a ComponentContainer", function() {
                expect(videoContainer instanceof ComponentContainer).toBeTruthy();
            });

            it("should have the correct css classes on the videoContainer", function() {
                expect(videoContainer.hasClass(data.cssClasses[0])).toBeTruthy();
            });

            it("should have the correct id on the videoContainer", function() {
                expect(videoContainer.id).toEqual(id);
            });

            it("should pass the correct args to the VideoPlayerMediator", function() {
                expect(VideoPlayerMediator.prototype.init).toHaveBeenCalledWith(videoContainer, mockPubSub, data.vpid);
            });

            it("should call destroy on the videoplayermediator when killVideo is called", function() {
                videoContainer.killVideo();
                expect(VideoPlayerMediator.prototype.destroy).toHaveBeenCalled();
            });

        });
    }
);