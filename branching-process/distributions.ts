export abstract class Distribution {
  abstract sample(): number;

  sumOfIndependentSamples(n: number): number {
    return Array.from({length: n}, () => this.sample())
      .reduce((a, b) => a + b, 0);
  }
}

export class UniformDistribution extends Distribution {
  constructor(private min: number, private max: number) {
    super();
  }

  sample() {
    return Math.floor(Math.random() * (this.max + 1 - this.min) + this.min);
  }
}

export class PoissonDistribution extends Distribution {
  private readonly l: number;

  constructor(private lambda: number) {
    super();
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
    return k - 1;
  }

  sumOfIndependentSamples(n: number) {
    if (n === 0) return 0;
    return (new PoissonDistribution(this.lambda * n)).sample();
  }

}

export class GeometricDistribution extends Distribution {
  constructor(private p: number) {
    super();
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
