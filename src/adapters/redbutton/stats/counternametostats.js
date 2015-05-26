require.def('redbuttonhtml/appui/components/cheesecake/adapters/stats/counternametostats',
    [
        'antie/application',
        'redbuttonhtml/stats/statsservice'
    ],
    function (Application, statsService) {
        'use strict';
        return function (countername) {
            var deviceId = Application.getCurrentApplication().guid;
            return function () {
                statsService.publishStats({
                    counterName: countername,
                    labels: {
                        device_id: deviceId
                    }
                });

            };
        };
    }
);