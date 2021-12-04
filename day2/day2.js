function calculatePosition(instructions) {
  let horizontal = 0;
  let depth = 0;
  instructions.forEach((instruction) => {
    const [direction, amount] = instruction.split(" ");
    if (direction === "forward") horizontal += +amount;
    if (direction === "down") depth += +amount;
    if (direction === "up") depth -= +amount;
  });

  return [horizontal, depth];
}
function calculatePositionV2(instructions) {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;
  instructions.forEach((instruction) => {
    const [newH, newD] = calculatePosition([instruction]);
    horizontal += newH;
    aim += newD;
    if (newH >= 1) depth += aim * newH;
  });
  return [horizontal, depth, aim];
}
module.exports = { calculatePosition, calculatePositionV2 };
