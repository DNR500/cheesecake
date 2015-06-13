require.def('mocks/ui/widget', [ ],
    function () {
        'use strict';
        return function () {
            var events = {};

            this.addEventListener = function(eventType, actionFunction){
                events[eventType] = actionFunction;
            };
            this.removeEventListener = function(eventType, actionFunction){
                events[eventType] = null;
            };
            this.fireEvent = function (eventType){
                events[eventType]();
            };
        };
    }
);

