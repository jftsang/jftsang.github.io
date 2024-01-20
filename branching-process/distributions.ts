export interface Distribution {
  sample: () => number;
}

export class UniformDistribution implements Distribution {
  constructor(private min: number, private max: number) {}
  sample() {
    return Math.floor(Math.random() * (this.max + 1 - this.min) + this.min);
  }
}

export class PoissonDistribution implements Distribution {
  private readonly l: number;
  constructor(private lambda: number) {
    if (this.lambda <= 0) {
      throw new Error("lambda must be > 0");
    }
    this.l = Math.exp(-this.lambda);
  }
  sample() {
    let k = 0
    let q = 1
    while (q > this.l) {
      k++;
      q *= Math.random();
    }
    q = 1;
    return k - 1;
  }
}

export class GeometricDistribution implements Distribution {
  private readonly l: number;
  constructor(private p: number) {
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
