function getDepthMeasurementIncreases(depths) {
  let depthIncrements = 0;
  depths.forEach((depth, i, origDepths) => {
    if (depth < origDepths[i + 1]) depthIncrements++;
  });
  return depthIncrements;
}

function createSlidingWindow(nums) {
  const newSlices = [];
  nums.forEach((num, i, nums) => {
    if (i < nums.length - 2) {
      newSlices.push(num + nums[i + 1] + nums[i + 2]);
    }
  });
  return newSlices;
}

module.exports = { getDepthMeasurementIncreases, createSlidingWindow };
