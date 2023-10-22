const maxSize = 12;


function memoize(fn) {
    const cache = {};
    const cachedFunction = (...args) => {
        if (cache[args] === undefined) {
            console.log(`calculating result for ${args}`)
            cache[args] = fn(...args);
        }
        else {
            console.log(`reusing result for ${args}`)
        }
        return cache[args];
    };
    return cachedFunction;
}

const factorial = memoize(n => {
    console.log(`calculate factorial ${n}`)
    if (n < 0)
        return null;
    if (n === 0)
        return 1;
    return factorial(n - 1) * n;
});

const binom = memoize((n, k) => {
    if (k < 0 || k > n) return 0;
    return factorial(n) / (factorial(k) * factorial(n - k))
})

const risingFactorial = memoize((x, n) => {
    if (n < 0)
        return null;
    if (n === 0)
        return 1;
    return (x + n - 1) * risingFactorial(x, n - 1);
})

function reduce(number,denomin){
    function gcd(a, b){
        return b ? gcd(b, a%b) : a;
    };
    g = gcd(number, denomin);
    return [number / g, denomin / g];
}

function calculateProbabilities(initialW, initialB) {
    const probabilities = new Array(maxSize);
    for (let i = 0; i < maxSize; i++) {
        probabilities[i] = new Array(i + 1);
        for (let j = 0; j <= i; j++) {
            const w = j;
            const b = i - j;
            const n1 = w - initialW;
            const n2 = b - initialB;
            const n = n1 + n2;
            probabilities[i][j] = [
                (
                    binom(n, n1)
                    * risingFactorial(initialW, n1)
                    * risingFactorial(initialB, n2)
                ),
                risingFactorial(initialW + initialB, n)
            ];
        }
    }
    return probabilities
}

class Cell {
    constructor(urn, w, b, p, q) {
        this.urn = urn;
        this.w = w;
        this.b = b;
        this.p = p;
        this.q = q;
    }

    render() {
        const el = document.createElement("div")
        el.classList.add("cell");

        if (this.q === null)
            el.classList.add("disabled")
        else {
            if (this.p === 0)
                el.classList.add("zero")

            const [num, den] = reduce(this.p, this.q);
            el.textContent = `${num} / ${den}`;
        }

        el.addEventListener("click", e => {
            urn.updateProbabilities(
                calculateProbabilities(this.w, this.b)
            );
            urn.reRender();
        });
        return el;
    }
}

class Urn {
    constructor(div) {
        this.div = div;

        this.cells = new Array(maxSize);
        for (let i = 0; i < maxSize; i++) {
            const row = document.createElement("div");
            row.classList.add("urnRow");
            div.appendChild(row);

            this.cells[i] = new Array(i + 1);
            for (let j = 0; j <= i; j++) {
                this.cells[i][j] = new Cell(this, j, i-j);
            }
        }

        this.updateProbabilities(calculateProbabilities(1, 1))
        this.reRender();
    }


    reRender() {
        Array.from(this.div.children).forEach(
            (row, i) => {
                while (row.lastElementChild) {
                    row.removeChild(row.lastElementChild)
                }

                for (let j = 0; j <= i; j++) {
                    row.appendChild(this.cells[i][j].render());
                }
            }
        )
    }

    updateProbabilities(probabilities) {
        for (let i = 0; i < maxSize; i++) {
            for (let j = 0; j <= i; j++) {
                [this.cells[i][j].p, this.cells[i][j].q] = probabilities[i][j]
            }
        }
    }
}

const urn = new Urn(document.getElementById("urn"));
