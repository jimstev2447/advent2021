const { findGamma, findEpsilon, findPowerConsumption } = require("./day3.js");
const { readFile } = require("fs");

describe("findGamma", () => {
  test("given a list containing a single binary digit will return that bit ", () => {
    const gamma = findGamma(["1"]);
    expect(gamma).toBe("1");
  });
  test("given a list containing multiple binary digit will return the most common ", () => {
    const gamma = findGamma(["1", "0", "0"]);
    expect(gamma).toBe("0");
  });
  test("given a 2bit binary list will return the most common in each place", () => {
    const gamma = findGamma(["10", "01", "01"]);
    expect(gamma).toBe("01");
  });
  test("given a longer and larger binary list will return the most common in each place", () => {
    const gamma = findGamma(["1010", "0110", "0110", "0101"]);
    expect(gamma).toBe("0110");
  });
});

describe("findEpsilon", () => {
  test("given a list containing a single binary digit will return the opposite", () => {
    const epsilon = findEpsilon(["1"]);
    expect(epsilon).toBe("0");
  });
  test("given a list containing multiple binary digit will return the least common ", () => {
    const epsilon = findEpsilon(["1", "0", "0"]);
    expect(epsilon).toBe("1");
  });
  test("given a 2bit binary list will return the least common in each place", () => {
    const epsilon = findEpsilon(["10", "01", "01"]);
    expect(epsilon).toBe("10");
  });
  test("given a longer and larger binary list will return the least common in each place", () => {
    const epsilon = findEpsilon(["1010", "0110", "0110", "0101"]);
    expect(epsilon).toBe("1001");
  });
});

describe("Advent pt1", () => {
  test("pt1", (done) => {
    readFile("./day3/day3.txt", "utf-8", (err, data) => {
      expect(findPowerConsumption(data)).toBe(3959450);
      done();
    });
  });
});
