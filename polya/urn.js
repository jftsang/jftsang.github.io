import {binom, reduce, risingFactorial} from "./mathutils.js";
import {colorMixer, getColor} from "./colorutils.js";

const maxSize = 24;


function calculateProbabilities(initialW, initialB) {
    const probabilities = new Array(maxSize + 1);
    for (let i = 0; i <= maxSize; i++) {
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

        let color;

        const prob = this.p / this.q;

        if (this.q === null || this.p === 0) {
            color = [245, 245, 255];
            el.innerHTML = `${this.w}W, ${this.b}B`;
        } else {
            color = colorMixer([255, 0, 0], [225, 225, 255], prob)

            const [num, den] = reduce(this.p, this.q);
            // const [num, den] = [this.p, this.q];

            if (den <= 20)
                el.innerHTML = `${this.w}W, ${this.b}B <br/> ${num} &frasl; ${den}<br/>${prob.toFixed(3)}`;
            else
                el.innerHTML = `${this.w}W, ${this.b}B <br/> ${prob.toFixed(3)}`;

        }

        el.style.backgroundColor = getColor(color);

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
    /**
     * Initializes the constructor and sets up the class properties.
     *
     * @param {HTMLElement} div - The HTML element that contains the cells.
     */
    constructor(div) {
        this.div = div;

        this.cells = new Array(maxSize + 1);
        for (let i = 0; i <= maxSize; i++) {
            const row = document.createElement("div");
            row.classList.add("urnRow");
            div.appendChild(row);


            this.cells[i] = new Array(i + 1);
            for (let j = 0; j <= i; j++) {
                this.cells[i][j] = new Cell(this, j, i - j);
            }
        }

        this.updateProbabilities(calculateProbabilities(1, 1))
        this.reRender();
    }

    /**
     * Re-renders the elements in the div container.
     *
     * This function iterates over each child element of the div container and re-renders them based on the values in the `this.cells` array.
     *
     * @return {undefined} This function does not return a value.
     */
    reRender() {
        Array.from(this.div.children).forEach(
            (row, i) => {
                if (i === 0)
                    return;

                while (row.lastElementChild) {
                    row.removeChild(row.lastElementChild)
                }

                for (let j = 0; j <= i; j++) {
                    row.appendChild(this.cells[i][j].render());
                }
            }
        )
    }

    /**
     * Updates the probabilities of the cells in the grid.
     *
     * @param {array} probabilities - The 2D array of probabilities for each cell.
     * @return {undefined} This function does not return a value.
     */
    updateProbabilities(probabilities) {
        for (let i = 0; i <= maxSize; i++) {
            for (let j = 0; j <= i; j++) {
                [this.cells[i][j].p, this.cells[i][j].q] = probabilities[i][j]
            }
        }
    }
}

const urn = new Urn(document.getElementById("urn"));
