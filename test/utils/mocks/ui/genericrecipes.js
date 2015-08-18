require.def("mocks/ui/genericrecipes",
    [ ],
    function () {
        'use strict';

        var basicWidget = {
            events: {},
            addEventListener: function(eventType, actionFunction){
                var listeners = this.events[eventType];
                if (!listeners) {
                    listeners = this.events[eventType] = {};
                }
                if (!listeners[actionFunction]) {
                    listeners[actionFunction] = actionFunction;
                }
            },
            removeEventListener: function(eventType, actionFunction){
                var listeners = this.events[eventType];
                if (listeners && listeners[actionFunction]) {
                    delete(listeners[actionFunction]);
                }
            },
            fireEvent: function(eventType){
                var listeners = this.events[eventType];
                if (listeners) {
                    for (var func in listeners) {
                        try {
                            listeners[func](eventType);
                        } catch (exception) {

                        }
                    }
                }
            }
        };

        return {
          getWidget: function() {
              return basicWidget;
          },
          getLabel: function() {
              return function (uniqueId, data) {
                  var label = Object.create(basicWidget);
                  label.type = "label";
                  label.id = uniqueId;
                  label.text = data.text;
                  label.getText = function(){
                      return this.text;
                  };
                  label.cssClasses = data.cssClasses ? data.cssClasses.slice(0) : undefined;
                  return label;
              };
          },
          getContainer: function() {
              return function (uniqueId, data) {
                  var container = Object.create(basicWidget);
                  container.type = "container";
                  container.childWidgets = [];
                  container.id = uniqueId;
                  container.cssClasses = data.cssClasses ? data.cssClasses.slice(0) : undefined;
                  container.appendChildWidget = function(childWidget) {
                        this.childWidgets.push(childWidget);
                  }
                  container.getChildWidgets = function() {
                        return this.childWidgets;
                  }
                  return container;
              };
          },
          getTextButton: function() {
              return function (uniqueId, data) {
                  var textbutton = Object.create(basicWidget);
                  textbutton.type = "textbutton";
                  textbutton.id = uniqueId;
                  textbutton.cssClasses = data.cssClasses ? data.cssClasses.slice(0) : undefined;
                  textbutton.text = data.text;
                  textbutton.select = function() {
                      this.fireEvent("select");
                  };
                  return textbutton;
              };
            }
        }
    }
);
