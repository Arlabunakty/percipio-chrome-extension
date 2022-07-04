
function visitArray(array: Array<any>):Array<string> {
    return array.flatMap((e) => visit(e));
}

function visitObject(object:Object):Array<string> {
    return Object.entries(object)
    .flatMap(([k,v]) => {
        if (k.toLowerCase().endsWith("url")) {
            return [v];
        }
        return visit(v);
    });
}

function visit(any: any):Array<string> {
    if (any === null || any === undefined) {
        return [];
    } else if (Array.isArray(any)) {
        return visitArray(any);
    } else if (typeof any === "function") {
        return [];
    } else if (typeof any === "object") {
        return visitObject(any);
    } else if (typeof any === "string") {
        if (any.startsWith("http")) {
            return [any];
        }
    }

    return [];
}

export default {
    parse: (string: string):Array<string> => {
        const json:any = JSON.parse(string);
        return Array.from(new Set<string>(visit(json)));
    }
};