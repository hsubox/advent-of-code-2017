/*
--- Day 3: Spiral Memory ---

You come across an experimental new kind of memory stored on an infinite two-dimensional grid.

Each square on the grid is allocated in a spiral pattern starting at a location marked 1 and then counting up while spiraling outward. For example, the first few squares are allocated like this:

17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23---> ...
While this is very space-efficient (no squares are skipped), requested data must be carried back to square 1 (the location of the only access port for this memory system) by programs that can only move up, down, left, or right. They always take the shortest path: the Manhattan Distance between the location of the data and square 1.

For example:

Data from square 1 is carried 0 steps, since it's at the access port.
Data from square 12 is carried 3 steps, such as: down, left, left.
Data from square 23 is carried only 2 steps: up twice.
Data from square 1024 must be carried 31 steps.
How many steps are required to carry the data from the square identified in your puzzle input all the way to the access port?

Your puzzle answer was 419.

--- Part Two ---

As a stress test on the system, the programs here clear the grid and then store the value 1 in square 1. Then, in the same allocation order as shown above, they store the sum of the values in all adjacent squares, including diagonals.

So, the first few squares' values are chosen as follows:

Square 1 starts with the value 1.
Square 2 has only one adjacent filled square (with value 1), so it also stores 1.
Square 3 has both of the above squares as neighbors and stores the sum of their values, 2.
Square 4 has all three of the aforementioned squares as neighbors and stores the sum of their values, 4.
Square 5 only has the first and fourth squares as neighbors, so it gets the value 5.
Once a square is written, its value does not change. Therefore, the first few squares would receive the following values:

147  142  133  122   59
304    5    4    2   57
330   10    1    1   54
351   11   23   25   26
362  747  806--->   ...
What is the first value written that is larger than your puzzle input?

Your puzzle answer was 295229.
*/

const assert = require('assert');

const input = 289326;

function day3_part1(input) {
  let lastSquareRoot = Math.floor(Math.sqrt(input));
  if (lastSquareRoot % 2 === 0) {
    lastSquareRoot += -1;
  }
  if (input === Math.pow(lastSquareRoot, 2)) {
    return lastSquareRoot - 1;
  }
  const nextSquareRoot = lastSquareRoot + 2; // same as length of side
  let nextCorner = Math.pow(lastSquareRoot, 2);
  for (let i = 0; i < 4 && nextCorner < input; i++) {
    nextCorner += lastSquareRoot + 1;
  }
  const fewerBy = Math.min(nextCorner - input, input - nextCorner + lastSquareRoot + 1);
  return lastSquareRoot - fewerBy + 1;
}

assert.equal(day3_part1(1), 0);
assert.equal(day3_part1(12), 3);
assert.equal(day3_part1(23), 2);
assert.equal(day3_part1(1022), 29);
assert.equal(day3_part1(1023), 30);
assert.equal(day3_part1(1024), 31);
console.log(day3_part1(input)); // 419

function day3_part2() {
  let spiral = {};
  let x = 0;
  let y = 0;
  spiral[`${x}, ${y}`] = 1;

  function getSumOfNeighbors(x, y) {
    let a = spiral[`${x-1}, ${y-1}`] || 0;
    let b = spiral[`${x}, ${y-1}`] || 0;
    let c = spiral[`${x+1}, ${y-1}`] || 0;
    let d = spiral[`${x-1}, ${y}`] || 0;
    let f = spiral[`${x+1}, ${y}`] || 0;
    let g = spiral[`${x-1}, ${y+1}`] || 0;
    let h = spiral[`${x}, ${y+1}`] || 0;
    let i = spiral[`${x+1}, ${y+1}`] || 0;
    return a + b + c + d + f + g + h + i;
  }

  function addToSpiral(x, y, value) {
    spiral[`${x}, ${y}`] = value;
  }

  let value;
  for (let r = 2; r < 6; r++) {
    x += 1;
    addToSpiral(x, y, getSumOfNeighbors(x, y));
    for (y; y < r; y++) {
      addToSpiral(x, y, getSumOfNeighbors(x, y));
    }
    y--;
    for (x; x > -r; x--) {
      addToSpiral(x, y, getSumOfNeighbors(x, y));
    }
    x++;
    for (y; y > -r; y--) {
      addToSpiral(x, y, getSumOfNeighbors(x, y));
    }
    y++;
    for (x; x < r; x++) {
      addToSpiral(x, y, getSumOfNeighbors(x, y));
    }
    x--;
  }

  return spiral;
}

console.log(day3_part2()); // 295229
