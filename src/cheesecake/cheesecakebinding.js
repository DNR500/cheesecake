require.def('cheesecake/cheesecakebinding',
    [
        'cheesecake/cheesecakestats',
        'cheesecake/cheesecakemappings'
    ],
    function (cheeseCakeStats, cheeseCakeMappings) {
        'use strict';

        var history = {};

        return {

            trackBinding: function(widget, actionData) {
                history[widget.id] = { widget: widget, actions: actionData};
            },

            bindWidget: function (widget, action, retrieveActionMethod) {
                var actionClosure = retrieveActionMethod(action.command);
                if (action.stat) {
                    cheeseCakeMappings.addEventListener(widget, action.eventType, cheeseCakeStats.makesStatsCall(action.stat));
                }
                cheeseCakeMappings.addEventListener(widget, action.eventType, actionClosure(action.parameters, widget, retrieveActionMethod));
            },

            unbindWidget: function (widget, actions) {
                var actionsHistoryItem = history[widget.id];
                if (actionsHistoryItem) {
                    for (var i = 0, len = actionsHistoryItem.actions.length; i < len; i++) {
                        var action = actionsHistoryItem.actions[i];
                        var actionCommand = actions[action.command](action.parameters);
                        cheeseCakeMappings.removeEventListener(widget, action.eventType, actionCommand);
                        if (action.stat) {
                            var statsFunction = cheeseCakeStats.makesStatsCall(action.stat);
                            cheeseCakeMappings.removeEventListener(widget, action.eventType, statsFunction);
                        }
                    }
                }
            },

            _unbindAllActions: function () {
                for (var widgetId in history) {
                    var widget = history[widgetId].widget;
                    this._unbindWidget(widget);
                    history[widgetId] = null;
                }
            },

            reset: function () {
                this._unbindAllActions();
                history = null;
            }
        };
    }
);
