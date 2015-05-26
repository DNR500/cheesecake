require.def('redbuttonhtml/appui/components/cheesecake/adapters/actions/postdata',
    [
        "antie/application",
        "redbuttonhtml/presenters/dialog/dialoghandlers",
        'antie/events/event'

    ],
    function (Application, DialogHandlers, Event) {
        'use strict';
        return function (parameters, widget, retrieveAction) {
            var requestManager = Application.getCurrentApplication().getRequestManager();
            var url = parameters.url.replace('%guid%', Application.getCurrentApplication().guid);
            var actions = parameters.actions;

            var successAction;
            var errorAction;

            for (var i = 0; i < actions.length; i++) {
                if (actions[i].eventType === 'onSuccess') {
                    successAction = retrieveAction(actions[i].command)();
                } else if (actions[i].eventType === 'onError') {
                    errorAction = retrieveAction(actions[i].command)(actions[i].parameters);
                }
            }

            parameters.options = {
                fieldName: 'payload',
                blankUrl: '/none',
                onError: function () {
                    widget.bubbleEvent(new Event('dismissoverlay'));
                    if(errorAction) {
                        errorAction();
                    }
                },
                onLoad: function () {
                    widget.bubbleEvent(new Event('dismissoverlay'));
                    if(successAction) {
                        successAction();
                    }
                }
            };

            var postAlreadyCalled = false;

            return function () {
                if (!postAlreadyCalled) {
                    requestManager.postData(url, parameters.body, parameters.options);
                    postAlreadyCalled = true;
                }
            };
        };
    }
);