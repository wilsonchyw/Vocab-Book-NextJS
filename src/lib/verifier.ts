export type VerifiedObj = { 
    [key: string]: string | number | any
};

const verifier = {
    exact: exact,
    atLeast: atLeast,
    atMost: atMost,
};

class KeyMissingError extends Error {
    constructor(public keys: Array<string>) {
        super(`[${keys.join(", ")}] is requied in request`);
        this.name = "KeyMissingError";
        this.stack = (<any>new Error()).stack;
    }
}

class KeyNotMatchError extends Error {
    constructor(public keys: Array<string>) {
        super(`[${keys.join(", ")}] must exact contain in request`);
        this.name = "KeyNotMatchError";
        this.stack = (<any>new Error()).stack;
    }
}

/**
 * @description Check if a object have the exact keys. Any object keys different with the @param keys will throw a error
 * @throws new KeyNotMatchError
 */
function exact(keys: Array<string>, obj: VerifiedObj) {
    if (keys.length != Object.keys(obj).length) throw new KeyNotMatchError(keys);
    keys.forEach((key) => {
        if (!obj[key]) throw new KeyNotMatchError(keys);
    });
}

/**
 * @description Check if a object have the keys speicficed. Without any speicficed keys will throw a error
 * @throws new KeyMissingError
 */
function atLeast(keys: Array<string>, obj: VerifiedObj) {
    const rest = keys.filter((key) => !obj[key]);
    if (rest.length) throw new KeyMissingError(rest);
}

/**
 * @description Check if a object have any unspecified keys. Without any unspecified keys will throw a error
 * @throws new KeyNotSupportError
 */
function atMost(keys: Array<string>, obj: VerifiedObj) {
    const rest = Object.keys(obj).filter((key) => !keys.includes(key));
    if (rest.length) throw new KeyNotMatchError(rest);
}

export default verifier;
