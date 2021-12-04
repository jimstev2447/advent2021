exports.findGamma = (binaries) => {
  let bin = "";
  const bitLength = binaries[0].length;
  for (let i = 0; i < bitLength; i++) {
    const mostCommon = mostCommonBinAtIndex(binaries, i);
    bin += mostCommon;
  }
  return bin;
};

exports.findEpsilon = (binaries) => {
  let bin = "";
  const bitLength = binaries[0].length;
  for (let i = 0; i < bitLength; i++) {
    const mostCommon = mostCommonBinAtIndex(binaries, i);
    bin += mostCommon === "0" ? "1" : "0";
  }
  return bin;
};

exports.findPowerConsumption = (data) => {
  const bins = data.split("\n");
  const gamma = this.findGamma(bins);
  const epsilon = this.findEpsilon(bins);
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

function mostCommonBinAtIndex(binaries, i) {
  let count = 0;
  binaries.forEach((bin) => (count += +bin[i]));
  return count > binaries.length / 2 ? "1" : "0";
}
