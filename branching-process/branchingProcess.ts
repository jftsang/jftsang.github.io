import {PoissonDistribution, GeometricDistribution, UniformDistribution, Distribution} from "./distributions";
// import Plotly from "plotly.js-dist-min";

const nSims = 100;
const nGenerations = 20;
const popCap = 10000;

const form = document.querySelector("form") as HTMLFormElement;
const parameterInput = document.getElementById("parameter") as HTMLInputElement;
const initialInput = document.getElementById("initial") as HTMLInputElement;
const runButton = document.getElementById("run") as HTMLButtonElement;

const generationSlider = document.getElementById("generationSlider") as HTMLInputElement;
generationSlider.max = (nGenerations - 1).toString();
const logScaleCheckbox = document.getElementById("logScale") as HTMLInputElement;


function nextGeneration(currentGeneration: number, distribution: Distribution): number {
  if (currentGeneration > popCap) {
    return currentGeneration;
  }
  return distribution.sumOfIndependentSamples(currentGeneration);
}


runButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  const formData = new FormData(form);
  for (const [name, value] of formData.entries()) {
    console.log(`${name}: ${value}`);
  }

  const distributionName = formData.get("distribution") as string;
  const parameter = parseFloat(parameterInput.value);
  const initial = parseInt(initialInput.value);

  let distribution: Distribution;
  if (distributionName === "uniform")
    distribution = new UniformDistribution(0, parameter);
  else if (distributionName === "poisson")
    distribution = new PoissonDistribution(parameter);
  else if (distributionName === "geometric")
    distribution = new GeometricDistribution(parameter);
  else
    throw new Error(`Unknown distribution ${distributionName}`);

  const results: number[][] = [];

  results.push(new Array(nSims).fill(initial));

  for (let gen = 1; gen < nGenerations; gen++) {
    const lastGen = results[gen - 1];
    const thisGen = lastGen.map(prevPop => nextGeneration(prevPop, distribution));
    results.push(thisGen);
  }

  function drawHistogram(gen: number, log: boolean = false) {
    const res = log ? results[gen].filter(x => x > 0) : results[gen];

    const maxX = Math.max(...res);

    // @ts-ignore
    const trace = {
      x: res,
      type: 'histogram',
      histfunc: 'count',
      xbins: {
        start: 0,
        end: log ? Math.ceil(Math.log10(maxX)) : maxX,
        size: 1
      },
      marker: {
        color: 'rgba(100, 200, 150, 0.7)'
      }
    };
    // @ts-ignore
    const data = [trace];
    const layout = {
      title: 'Branching process',
      xaxis: {
        title: 'Population',
        type: log ? 'log' : 'linear'
      },
      yaxis: {
        title: 'Probability',
      }
    };

    const histogram = document.getElementById("histogram") as HTMLDivElement;
    // @ts-ignore
    Plotly.newPlot(histogram, data, layout);
  }

  const redraw = () => {
    drawHistogram(parseInt(generationSlider.value), logScaleCheckbox.checked);
  }
  generationSlider.oninput = redraw;
  logScaleCheckbox.oninput = redraw;

  generationSlider.value = (1).toString();
  drawHistogram(1);
})
