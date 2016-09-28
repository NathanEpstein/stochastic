Number.isInteger = Number.isInteger || function(value) {
    return typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value;
};

Math.sign = Math.sign || function(x) {
    x = +x; // convert to a number
    if (x === 0 || isNaN(x)) {
        return x;
    }
    return x > 0 ? 1 : -1;
};

let isNonNegative = (n) => {
    let s = Math.sign(n);
    return s === 1 || s === 0;
}

let isMatrix = (m) => {
    return Array.isArray(m) && m.every((e) => Array.isArray(e));
}

let isSymmetricMatrix = (m) => {
    return isMatrix(m) && m.every((e) => e.length === m.length);
}

console.log(Number.isInteger(4));
console.log(Math.sign(-5));
console.log(isNonNegative(8));
console.log(isMatrix([[]]));
console.log(isSymetricMatrix([[1], [1,2,3], [1], [1,2,3]]));
console.log(isSymetricMatrix([[1], [1]]));
