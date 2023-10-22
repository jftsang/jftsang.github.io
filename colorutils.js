/**
 *
 * https://stackoverflow.com/a/32171077
 */
//colorChannelA and colorChannelB are ints ranging from 0 to 255
function colorChannelMixer(colorChannelA, colorChannelB, amountToMix){
    const channelA = colorChannelA * amountToMix;
    const channelB = colorChannelB * (1 - amountToMix);
    return parseInt(channelA + channelB);
}

//rgbA and rgbB are arrays, amountToMix ranges from 0.0 to 1.0
//example (red): rgbA = [255,0,0]
export function colorMixer(rgbA, rgbB, amountToMix){
    amountToMix = amountToMix ** 0.65;
    const r = colorChannelMixer(rgbA[0], rgbB[0], amountToMix);
    const g = colorChannelMixer(rgbA[1], rgbB[1], amountToMix);
    const b = colorChannelMixer(rgbA[2], rgbB[2], amountToMix);
    return [r, g, b]
}

export function getColor(color) {
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}