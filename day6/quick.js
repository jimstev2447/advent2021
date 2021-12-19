const fs = require("fs");

class LanternFish {
  constructor(daysTillSpawn) {
    this.daysTillSpawn = daysTillSpawn;
    this.spawning = false;
  }
  age() {
    if (this.daysTillSpawn === 0) {
      this.daysTillSpawn = 6;
      this.spawning = true;
    } else {
      this.daysTillSpawn--;
      this.spawning = false;
    }
  }
  isSpawning() {
    return this.spawning;
  }
}

class Schole {
  constructor(fishNums) {
    this.fish = fishNums.map((n) => new LanternFish(n));
    this.days = 0;
  }
  increaseDay(n) {
    for (let i = n; i >= 1; i--) {
      this.days++;
      this.fish.forEach((fish) => {
        fish.age();
        if (fish.isSpawning()) {
          this.fish.push(new LanternFish(8));
        }
      });
    }
  }
  size() {
    return this.fish.length;
  }
}

const testData = [3, 4, 3, 1, 2];

function fishSpawner(timeLeft, timeTillSpawn) {
  const remainingTimeAfterSpawning = timeLeft - timeTillSpawn;
  if (remainingTimeAfterSpawning < 0) return 0;
  if (remainingTimeAfterSpawning < 1) return 1;
  return (
    fishSpawner(remainingTimeAfterSpawning, 9) +
    fishSpawner(remainingTimeAfterSpawning, 7)
  );
}
function getFish(fish, time) {
  const totalFish = fish
    .map((f) => {
      return fishSpawner(time, f);
    })
    .reduce((acc, n) => acc + n, 0);

  return totalFish;
}

//console.log(getFish(testData, 256));

module.exports = fishSpawner;

// fs.readFile("./day6/data.txt", "utf-8", (err, data) => {
//   const fishNums = data.split(",").map((s) => +s);
//   console.log(getFish(fishNums, 256));
// });
