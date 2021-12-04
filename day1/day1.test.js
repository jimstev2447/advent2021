const { getDepthMeasurementIncreases, createSlidingWindow } = require("./day1");
const fs = require("fs");

describe("getDepthMeasurementIncreases", () => {
  test("given a single number will return 0", () => {
    expect(getDepthMeasurementIncreases([1])).toBe(0);
  });
  test("when given 2 numbers will return 1 if the second number is higher than the first", () => {
    expect(getDepthMeasurementIncreases([0, 1])).toBe(1);
  });
  test("when given 2 numbers equal there will be no increase", () => {
    expect(getDepthMeasurementIncreases([1, 1])).toBe(0);
  });
  test("when given more number will increase the depth appropriatley", () => {
    expect(getDepthMeasurementIncreases([0, 1, 2])).toBe(2);
    expect(getDepthMeasurementIncreases([0, 1, 2, 3, 2, 4])).toBe(4);
    expect(getDepthMeasurementIncreases([4, 6, 2, 1, 3, 4, 2])).toBe(3);
  });
});
describe("Advent pt1", () => {
  test("pt1", (done) => {
    fs.readFile("./day1/data.txt", "utf-8", function (err, dataString) {
      const depths = dataString.split("\n").map((s) => +s);
      const answer = getDepthMeasurementIncreases(depths);
      expect(answer).toBe(1557);
      done();
    });
  });
});
describe("createSlidingWindow", () => {
  test("returns single slice when given 3 nums", () => {
    expect(createSlidingWindow([0, 0, 0])).toEqual([0]);
    expect(createSlidingWindow([1, 1, 1])).toEqual([3]);
  });
  test("given a larger data set will return slices up to the end of the array", () => {
    expect(createSlidingWindow([0, 0, 0, 0])).toEqual([0, 0]);
    expect(createSlidingWindow([1, 2, 3, 4])).toEqual([6, 9]);
  });
});
describe("Advent pt2", () => {
  test("pt2", (done) => {
    fs.readFile("./day1/data.txt", "utf-8", function (err, dataString) {
      const depths = dataString.split("\n").map((s) => +s);
      const slidingWindow = createSlidingWindow(depths);
      const answer = getDepthMeasurementIncreases(slidingWindow);
      expect(answer).toBe(1608);
      done();
    });
  });
});
