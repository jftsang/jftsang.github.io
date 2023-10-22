export function memoize(fn) {
    const cache = {};
    return (...args) => {
        if (cache[args] === undefined)
            cache[args] = fn(...args);
        return cache[args];
    };
}

export const factorial = memoize(n => {
    if (n < 0)
        return null;
    if (n === 0)
        return 1;
    return factorial(n - 1) * n;
});

export const binom = memoize((n, k) => {
    if (k < 0 || k > n) return 0;
    return factorial(n) / (factorial(k) * factorial(n - k))
})

export const risingFactorial = memoize((x, n) => {
    if (n < 0)
        return null;
    if (n === 0)
        return 1;
    return (x + n - 1) * risingFactorial(x, n - 1);
})

export function reduce(num, den) {
    function gcd(a, b){
        return b ? gcd(b, a % b) : a;
    }

    const g = gcd(num, den);
    return [num / g, den / g];
}
