const { calculatePosition, calculatePositionV2 } = require("./day2");
const { readFile } = require("fs");

describe("calculatePosition", () => {
  test("returns a tuple containing the horizontal and depth positions", () => {
    const [h, d] = calculatePosition([]);
    expect(h).toBe(0);
    expect(d).toBe(0);
  });
  test("given a forward instruction will increase horizontal by given number", () => {
    const [h, d] = calculatePosition(["forward 1"]);
    expect(h).toBe(1);
  });
  test("given a down instruction will increase depth by given number", () => {
    const [h, d] = calculatePosition(["down 1"]);
    expect(d).toBe(1);
  });
  test("given a up instruction will decrease depth by given number", () => {
    const [h, d] = calculatePosition(["up 1"]);
    expect(d).toBe(-1);
  });
  test("will accept multiple instructions", () => {
    const [h, d] = calculatePosition(["down 2", "up 1", "forward 1"]);
    expect(d).toBe(1);
    expect(h).toBe(1);
  });
});

describe("Advent Day2 pt1", () => {
  test("pt1", (done) => {
    readFile("./day2/day2.txt", "utf-8", (err, data) => {
      const directions = data.split("\n");
      const [h, d] = calculatePosition(directions);
      expect(h * d).toBe(1507611);
      done();
    });
  });
});
describe("calculatePositionsV2", () => {
  test("returns a tuple containing the horizontal, depth and aim positions", () => {
    const [h, d, a] = calculatePositionV2([]);
    expect(h).toBe(0);
    expect(d).toBe(0);
    expect(a).toBe(0);
  });
  test("given a down instruction will increase depth and aim by given number", () => {
    const [h, d, a] = calculatePositionV2(["down 1"]);
    expect(a).toBe(1);
  });
  test("given a up instruction will decrease depth and aim by given number", () => {
    const [h, d, a] = calculatePositionV2(["up 1"]);
    expect(a).toBe(-1);
  });
  test("given a forward instruction will increase horizontal by given number", () => {
    const [h, d, a] = calculatePositionV2(["forward 1"]);
    expect(h).toBe(1);
  });
  test("will accept multiple instructions", () => {
    const [h, d, a] = calculatePositionV2(["down 2", "up 1", "down 2"]);
    expect(d).toBe(0);
    expect(a).toBe(3);
    expect(h).toBe(0);
  });
  test("given a forward instruction will increase depth by the current aim multiplied by given number", () => {
    const [h, d, a] = calculatePositionV2(["forward 1"]);
    expect(h).toBe(1);
    const [h1, d1, a1] = calculatePositionV2([
      "forward 5",
      "down 5",
      "forward 8",
    ]);
    expect(d1).toBe(40);
  });
  test("example acceptance test", () => {
    const [h, d, a] = calculatePositionV2([
      "forward 5",
      "down 5",
      "forward 8",
      "up 3",
      "down 8",
      "forward 2",
    ]);
    expect(h).toBe(15);
    expect(d).toBe(60);
  });
});

describe("Advent day2 pt2", () => {
  test("pt2", (done) => {
    readFile("./day2/day2.txt", "utf-8", (err, data) => {
      const directions = data.split("\n");
      const [h, d] = calculatePositionV2(directions);
      expect(h * d).toBe(1880593125);
      done();
    });
  });
});
