interface Distribution {
  sample: () => number;
}

class UniformDistribution implements Distribution {
  constructor(private min: number, private max: number) {}
  sample() {
    return Math.floor(Math.random() * (this.max + 1 - this.min) + this.min);
  }
}


class PoissonDistribution implements Distribution {
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


const d = new PoissonDistribution(10);
for (let i = 0; i < 10; i++) {
  console.log(d.sample());
}
