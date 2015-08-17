require.def('cheesecake/cheesecakemappings',
    [ ],
    function () {
        'use strict';

        var appendChildDefault = function(parentWidget, childWidget) {
            parentWidget.appendChildWidget(childWidget);
        };
        var getChildrenDefault = function(widget) {
            return widget.getChildWidgets();
        };
        var hasChildrenDefault = function(widget) {
            return widget.getChildWidgets && widget.getChildWidgets().length > 0;
        };
        var addEventListenerDefault = function(widget, eventType, actionFunction) {
            widget.addEventListener(eventType, actionFunction);
        };
        var removeEventListenerDefault = function(widget, eventType, actionFunction) {
            widget.removeEventListener(eventType, actionFunction);
        };

        var _defaultCheeseCakeRecipeName = "container";
        var _appendChild = appendChildDefault;
        var _getChildren = getChildrenDefault;
        var _hasChildren = hasChildrenDefault;
        var _addEventListener = addEventListenerDefault;
        var _removeEventListener = removeEventListenerDefault;

        var setDefaultValues = function() {
            _defaultCheeseCakeRecipeName = "container";
            _appendChild = appendChildDefault;
            _getChildren = getChildrenDefault;
            _hasChildren = hasChildrenDefault;
            _addEventListener = addEventListenerDefault;
            _removeEventListener = removeEventListenerDefault;
        };

        return {
            setCheeseCakeRecipeName : function (newName) {
                _defaultCheeseCakeRecipeName = newName;
            },
            setAppendChildFunction : function (newFunction) {
                _appendChild= newFunction;
            },
            setGetChildrenFunction : function (newFunction) {
                _getChildren = newFunction;
            },
            setHasChildrenFunction : function (newFunction) {
                _hasChildren = newFunction;
            },
            setAddEventListenerFunction : function (newFunction) {
                _addEventListener = newFunction;
            },
            setRemoveEventListenerFunction : function (newFunction) {
                _removeEventListener = newFunction;
            },
            reset : function () {
                setDefaultValues();
            },
            cheeseCakeRecipeName: function() {
                return _defaultCheeseCakeRecipeName;
            },
            appendChild: function () {
                _appendChild.apply(this, arguments);
            },
            getChildren: function () {
                return _getChildren.apply(this, arguments);
            },
            hasChildren: function() {
                return _hasChildren.apply(this, arguments);
            },
            addEventListener : function () {
                _addEventListener.apply(this, arguments);
            },
            removeEventListener : function () {
                _removeEventListener.apply(this, arguments);
            }
        };
    }
);
