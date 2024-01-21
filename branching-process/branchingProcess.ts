import {PoissonDistribution, GeometricDistribution, UniformDistribution, Distribution} from "./distributions.js";
// import Plotly from "plotly.js-dist-min";

const form = document.querySelector("form") as HTMLFormElement;
const parameterInput = document.getElementById("parameter") as HTMLInputElement;
const generationsInput = document.getElementById("generations") as HTMLInputElement;
const runButton = document.getElementById("run") as HTMLButtonElement;

runButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  const formData = new FormData(form);
  for (const [name, value] of formData.entries()) {
    console.log(`${name}: ${value}`);
  }

  const distributionName = formData.get("distribution") as string;
  const parameter = parseFloat(parameterInput.value);

  let distribution: Distribution;
  if (distributionName === "uniform")
    distribution = new UniformDistribution(0, parameter);
  else if (distributionName === "poisson")
    distribution = new PoissonDistribution(parameter);
  else if (distributionName === "geometric")
    distribution = new GeometricDistribution(parameter);
  else
    throw new Error(`Unknown distribution ${distributionName}`);

  const generations = parseInt(generationsInput.value);

  const x = [];
  for (let i = 0; i < 500; i ++) {
    x[i] = distribution.sample();
  }

  const trace = {
    x: x,
    type: 'histogram',
  };
  const data = [trace];

  const histogram = document.getElementById("histogram");
  // @ts-ignore
  Plotly.newPlot(histogram, data);
})
