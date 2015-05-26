require(
    [
        'redbuttonhtml/appui/components/cheesecake/adapters/stats/counternametostats',
        'antie/application',
        'redbuttonhtml/stats/statsservice'

    ],
    function (counternameToStats, Application, statsService) {
        'use strict';

        var mockApplication = function() {
            var application = {
                guid: "some-device-id"
            };
            spyOn(Application, "getCurrentApplication").and.returnValue(application);
        };

        describe("Counter name to stats cheesecake action", function () {


            it("should call stats function when inner function is executed", function() {
                mockApplication();
                spyOn(statsService, "publishStats");

                var action = counternameToStats("countername-goes-here");
                expect(action).toEqual(jasmine.any(Function));

                action();

                expect(statsService.publishStats.calls.count()).toEqual(1);

                expect(statsService.publishStats.calls.mostRecent().args).toEqual([{
                    counterName: "countername-goes-here",
                    labels: {
                        device_id: "some-device-id"
                    }
                }]);
            });

        });
    }
);