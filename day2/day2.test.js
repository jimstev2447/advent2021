const { calculatePosition } = require("./day2");

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
