require.def('cheesecake/cheesecakeactions',
    [
        'cheesecake/cheesecakebinding'
    ],
    function (CheeseCakeBindings) {
        'use strict';

        var actions = {};

        return {
            hasAction: function (name) {
                return actions[name] ? true : false;
            },

            addAction: function (name, actionFunction) {
                actions[name] = actionFunction;
                return name;
            },

            removeAction: function (name) {
                actions[name] = undefined;
            },

            getAction: function (name) {
                return actions[name];
            },

            bindActionsToWidget: function (widget, actionData) {
                for (var i = 0; i < actionData.length; i++) {
                    CheeseCakeBindings.bindWidget(widget, actionData[i], this.getAction);
                }
                CheeseCakeBindings.trackBinding(widget, actionData);
            },

            _iterateChildren: function (children) {
                for (var i = 0; i < children.length; i++) {
                    var widget = children[i];
                    CheeseCakeBindings.unbindWidget(widget, actions);

                    if (widget.getChildWidgets) {
                        this._iterateChildren(widget.getChildWidgets());
                    }
                }
            },

            unbindCheeseCake: function (cheesecakecontainer) {
                this._iterateChildren(cheesecakecontainer.getChildWidgets());
            },

            reset: function () {
                CheeseCakeBindings.reset();
                actions = null;
            }
        };
    }
);
