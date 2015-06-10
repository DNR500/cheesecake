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
                if (action.countername) {
                    cheeseCakeMappings.addEventListener(widget, action.eventType, cheeseCakeStats.makesStatsCall(action.countername));
                }
                cheeseCakeMappings.addEventListener(widget, action.eventType, actionClosure(action.parameters, widget, retrieveActionMethod));
            },

            unbindWidget: function (widget, actions) {
                var actionsHistoryItem = history[widget.id];
                if (actionsHistoryItem) {
                    for (var i = 0; i < actionsHistoryItem.actions.length; i++) {
                        var action = actionsHistoryItem.actions[i];
                        cheeseCakeMappings.removeEventListener(widget, action.eventType, actions[action.command](action.parameters));
                        if (action.countername) {
                            cheeseCakeMappings.removeEventListener(widget, action.eventType, cheeseCakeStats.makesStatsCall(action.countername));
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
