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
module.exports = { calculatePosition };
