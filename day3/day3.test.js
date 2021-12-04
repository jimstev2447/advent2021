const {
  findGamma,
  findEpsilon,
  findPowerConsumption,
  findLifeSupportRating,
  oxygenGenRating,
  c02ScrubberRating,
} = require("./day3.js");
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

describe("oxygenGenRating", () => {
  test("given a single bit will return that bit", () => {
    expect(oxygenGenRating(["1"])).toBe("1");
  });
  test("given 2 bits will return the most common and if tied 1", () => {
    expect(oxygenGenRating(["0", "0"])).toBe("0");
    expect(oxygenGenRating(["0", "1"])).toBe("1");
    expect(oxygenGenRating(["1", "1"])).toBe("1");
  });
  test("given larger bit numbers, will return the one with the most common number at each index", () => {
    expect(oxygenGenRating(["010", "101", "110"])).toBe("110");
  });
  test("acceptance test", () => {
    const bins = [
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ];
    expect(oxygenGenRating(bins)).toBe("10111");
  });
});

describe("c02ScrubberRating", () => {
  test("given a single bit will return that bit", () => {
    expect(c02ScrubberRating(["1"])).toBe("1");
  });
  test("given 2 bits will return the least common and if tied 0", () => {
    expect(c02ScrubberRating(["0", "0"])).toBe("0");
    expect(c02ScrubberRating(["0", "1"])).toBe("0");
    expect(c02ScrubberRating(["1", "1"])).toBe("1");
  });
  test("given larger bit numbers, will return the one with the most common number at each index", () => {
    expect(c02ScrubberRating(["010", "101", "110"])).toBe("010");
  });
  test("acceptance test", () => {
    const bins = [
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ];
    expect(c02ScrubberRating(bins)).toBe("01010");
  });
});

describe("Advent pt2", () => {
  test("pt2", (done) => {
    readFile("./day3/day3.txt", "utf-8", (err, data) => {
      expect(findLifeSupportRating(data)).toBe(7440311);
      done();
    });
  });
});
