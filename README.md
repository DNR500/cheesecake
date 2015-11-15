# cheesecake
This is cheesecake-core the component that allows a level of view-abstraction - allowing you to build components from JSON.

For a concrete example on how to use cheesecake see the [jTal-adapter](https://github.com/DNR500/jtal-adapter) project

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

#### About cheesecake

The cheesecake library is a set of factories that has been assembled to allow the creation of UI elements using JSON in a declaritive approach. In terms of HTML it provides mechanisms to outline definitions for..

**DOM elements** - which can be defined using recipes.

**Event listeners** - which can be defined using actions.

**Stats** - which can be defined on each action.

Once you have a set of definitions you can use JSON to create your visual component ready for being appended to your DOM.

#### For development of cheesecake - commands of note

**grunt test** - runs tests and lint checks.

**grunt build** - creates a new folder in your project and build the version for distribution.

**grunt release** - bumps the version number, creates a number release tag, commits the new tag to git and updates master with a new .

