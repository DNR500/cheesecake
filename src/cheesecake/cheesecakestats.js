require.def('cheesecake/cheesecakestats',
    [ ],
    function () {
        'use strict';
        var statsCallFunction;

        return {
            addStatsCallFunction: function (statsFunction) {
                statsCallFunction = statsFunction;
            },
            makesStatsCall : function ( stat ) {
                if(statsCallFunction){
                    return statsCallFunction( stat );
                }
            }
        };
    }
);
