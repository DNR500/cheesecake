# cheesecake
A sweet little api that allows you to build components declaritively using JSON.

For a concrete example on how to use cheesecake see the [jTal-adapter](https://github.com/DNR500/jtal-adapter) project. To see both Cheesecake and jTal put to use take a look at [cheesecake-jtal-example](https://github.com/DNR500/cheesecake-jtal-example)

#### To import into your project
cheesecake is available via both npm and bower

npm

```
npm install cheesecake-core
```

bower

```
bower install cheesecake
```

### About cheesecake

The cheesecake library is a set of factories that has been assembled to allow the creation of UI elements using JSON in a declaritive approach. In terms of HTML it provides mechanisms to outline definitions for..

* **DOM elements** - which can be defined using recipes.
* **Event listeners** - which can be defined using actions.
* **Stats** - which can be defined on each action.

Once you have a set of definitions you can use JSON to create your visual component ready for being appended to the DOM.

### AMD Import
To import into your RequireJS project make sure that the paths are correctly configured in your require config

```
paths: {
  cheesecake : 'bower_components/cheesecake/build/uncompressed/cheesecake'
}

```
To use in your modules you just need the following import..

```
define(
    [
        "cheesecake/cheesecakefactory"
    ],
    function(cheesecake) {
        'use strict';
			
		// your code goes here 
    }
);

```


### Create a recipe
Use the addRecipe method to create your recipe definition.

```
cheesecake.addRecipe("foo", function(data, parent) {
    var span = document.createElement('span');
    span.innerHTML = data.name;

    var div = document.createElement('div');
    if(data.id){
    	div.id = data.id;
    }
    div.innerHTML = data.salutation + " ";
    div.appendChild(span);
              
    return div;
});  

```
After defining your recipe you can use your recipe using a JSON outline. The above could be invoked by..

```
var cheesecakeJson = {
    cheesecake:{
        recipeName: "foo",
        name: "Betty",
        salutation: "Hello"
    }
};

var element = cheesecake.createCheeseCake(cheesecakeJson);

document.body.appendChild(element);
```
The recipe can be used numberous times.

#### Function arguments and return value
An overview of the function arguments.

* **id** - this should be unique.
* **data** - this is the object that defines the recipe, all the nodes that sit at the same level as the recipeName (and that flow off that part of the tree) can be accessed. Ideally you should only read these values and not overwrite them
* **parent** - this is the parent element to which the element output will be appended. Cheesecake will deal with the appending of an element to its parent for you.

Note: the return value should always be the element you wish to be appended to the parent.

 
 
### Create an action
Use the addAction method to create your action definition. 

```
cheesecake.addAction("bar", function(parameters) {
    return function(e){
        alert("Hello again");
    };
});
```
To invoke the action you would use the action as in the following snipet - the inner function would be called when the div dispatches an click event. event objects may be passed as arguments on the inner function block (this depends on the event dispatch of your underlying view framework).

```
var cheesecakeJson = {
    cheesecake:{
        recipeName: "foo",
        name: "Betty",
        salutation: "Hello",
        actions:[
        	{
        		eventType:"click",
        		command:"bar"
        	}
        ]
    }
};

var element = cheesecake.createCheeseCake(cheesecakeJson);

document.body.appendChild(element);
```

#### Action chaining
Actions are little reusable pieces of code and as such, in the spirit of D.R.Y. , you can chain a number of actions. The following example demonstrates calling one action from another

```
cheesecake.addAction("foobar", function(parameters) {
    return function(){
        console.log("Goodbye " + parameters.firstPerson);
    };
});

cheesecake.addAction("barfoo", function(parameters, widget, getAction) {
    return function(){
        console.log("Hello " + parameters.secondPerson);
        var actionClosure = getAction("foobar");
        var action = actionClosure(parameters, widget, retrieveAction);
        action();
    };
});

var cheesecakeJson = {
    cheesecake:{
        recipeName: "foo",
        name: "Betty",
        salutation: "Hello",
        actions:[
        	{
        		eventType:"click",
        		parameters: {
        			firstPerson: "Jill",
        			secondPerson: "John"
        		}
        		command:"barfoo"
        	}
        ]
    }
};

var element = cheesecake.createCheeseCake(cheesecakeJson);

document.body.appendChild(element);
```
The output should be "Hello John" followed by "Goodbye Jill".

#### Function arguments and return value
An overview of the function arguments.

* **parameters** - this is the parameters action that is 
* **wigdet** - this is the element which is the parent of the the action definition as outlined in the JSON.
* **getAction** - this allows you to access action closures from within other actions.

Note: the return value when defining your actions using the add actions method should always be a function. Actions, as they are fundamentally tied into event dispatches, are closures.

### Reserved words in cheesecake JSON
Currently **recipeName**, **actions**, **command**, **eventType**, **parameters** and **children** are reseved key words that Cheesecake needs to operation correctly. You should avoid misuse of these names.

### For development of cheesecake - commands of note
* **grunt test** - runs tests and lint checks.
* **grunt build** - creates a new folder in your project and build the version for distribution.
* **grunt release** - bumps the version number, creates a number release tag, commits the new tag to git and updates master with a new .

