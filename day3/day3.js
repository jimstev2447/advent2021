exports.findGamma = (binaries) => {
  let bin = "";
  findMostCommonAtEachIndex(binaries, (mostCommon) => {
    bin += mostCommon;
  });
  return bin;
};

exports.findEpsilon = (binaries) => {
  let bin = "";
  findMostCommonAtEachIndex(binaries, (mostCommon) => {
    bin += mostCommon === "0" ? "1" : "0";
  });
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
  return count >= binaries.length / 2 ? "1" : "0";
}

exports.oxygenGenRating = (binaries) => {
  for (let i = 0; i < binaries[0].length; i++) {
    const mostCommon = mostCommonBinAtIndex(binaries, i);
    if (binaries.length > 1) {
      binaries = binaries.filter((bin) => bin[i] === mostCommon);
    }
  }
  return binaries[0];
};

exports.c02ScrubberRating = (binaries) => {
  for (let i = 0; i < binaries[0].length; i++) {
    const mostCommon = mostCommonBinAtIndex(binaries, i);
    const leastCommon = mostCommon === "1" ? "0" : "1";
    const newBinaries = binaries.filter((bin) => bin[i] === leastCommon);
    if (newBinaries.length === 0) return binaries[0];
    if (newBinaries.length === 1) return newBinaries[0];
    binaries = newBinaries;
  }
};

function findMostCommonAtEachIndex(binaries, cb) {
  const bitLength = binaries[0].length;
  for (let i = 0; i < bitLength; i++) {
    const mostCommon = mostCommonBinAtIndex(binaries, i);
    cb(mostCommon);
  }
}

exports.findLifeSupportRating = (data) => {
  const bins = data.split("\n");
  const o2 = this.oxygenGenRating(bins);
  const co2 = this.c02ScrubberRating(bins);
  return parseInt(o2, 2) * parseInt(co2, 2);
};
