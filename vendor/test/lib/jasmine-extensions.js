function spyOnAll(obj) {
    if (obj === undefined) {
        throw "spyOnAll could not find an object to spy upon.";
    }

    if (arguments > 1) {
        throw "spyOnAll should only take one argument.";
    }

    for (var prop in obj) {
        if (typeof obj[prop] === "function") {
            spyOn(obj, prop);
        }
    }
}

function createSpyInstance(clazz) {
    spyOnAll(clazz.prototype);
    return new clazz();
}

function copyJsonObject(originalObject) {
    return JSON.parse(JSON.stringify(originalObject));
}
