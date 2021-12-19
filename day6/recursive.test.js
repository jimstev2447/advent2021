const recursive = require("./quick");
describe("recursive", () => {
  test("given a time till spawn and a days less than that time will always return 1", () => {
    expect(recursive(3, 5)).toBe(1);
  });
  test("given a number of days exceeding the time till spawn will increase by 1", () => {
    expect(recursive(6, 5)).toBe(2);
  });
  test("will continue to increase every 6 days", () => {
    expect(recursive(9, 1)).toBe(3);
    expect(recursive(14, 6)).toBe(3);
  });
  test("the first increase will then increase after 8 days", () => {
    expect(recursive(11, 1)).toBe(4);
    //expect(recursive(1, 256));
  });
});
