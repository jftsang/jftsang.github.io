export class UniformDistribution {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
    sample() {
        return Math.floor(Math.random() * (this.max + 1 - this.min) + this.min);
    }
}
export class PoissonDistribution {
    constructor(lambda) {
        this.lambda = lambda;
        if (this.lambda <= 0) {
            throw new Error("lambda must be > 0");
        }
        this.l = Math.exp(-this.lambda);
    }
    sample() {
        let k = 0;
        let q = 1;
        while (q > this.l) {
            k++;
            q *= Math.random();
        }
        q = 1;
        return k - 1;
    }
}
export class GeometricDistribution {
    constructor(p) {
        this.p = p;
        if (this.p <= 0 || this.p > 1) {
            throw new Error("need 0 < p <= 1");
        }
    }
    sample() {
        let failures = 0;
        while (Math.random() > this.p) {
            failures++;
        }
        return failures;
    }
}
