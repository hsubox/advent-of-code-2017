/*
--- Day 21: Fractal Art ---
You find a program trying to generate some art. It uses a strange process that involves repeatedly enhancing the detail of an image through a set of rules.

The image consists of a two-dimensional square grid of pixels that are either on (#) or off (.). The program always begins with this pattern:

.#.
..#
###
Because the pattern is both 3 pixels wide and 3 pixels tall, it is said to have a size of 3.

Then, the program repeats the following process:

If the size is evenly divisible by 2, break the pixels up into 2x2 squares, and convert each 2x2 square into a 3x3 square by following the corresponding enhancement rule.
Otherwise, the size is evenly divisible by 3; break the pixels up into 3x3 squares, and convert each 3x3 square into a 4x4 square by following the corresponding enhancement rule.
Because each square of pixels is replaced by a larger one, the image gains pixels and so its size increases.

The artist's book of enhancement rules is nearby (your puzzle input); however, it seems to be missing rules. The artist explains that sometimes, one must rotate or flip the input pattern to find a match. (Never rotate or flip the output pattern, though.) Each pattern is written concisely: rows are listed as single units, ordered top-down, and separated by slashes. For example, the following rules correspond to the adjacent patterns:

../.#  =  ..
          .#

                .#.
.#./..#/###  =  ..#
                ###

                        #..#
#..#/..../#..#/.##.  =  ....
                        #..#
                        .##.
When searching for a rule to use, rotate and flip the pattern as necessary. For example, all of the following patterns match the same rule:

.#.   .#.   #..   ###
..#   #..   #.#   ..#
###   ###   ##.   .#.
Suppose the book contained the following two rules:

../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#
As before, the program begins with this pattern:

.#.
..#
###
The size of the grid (3) is not divisible by 2, but it is divisible by 3. It divides evenly into a single square; the square matches the second rule, which produces:

#..#
....
....
#..#
The size of this enhanced grid (4) is evenly divisible by 2, so that rule is used. It divides evenly into four squares:

#.|.#
..|..
--+--
..|..
#.|.#
Each of these squares matches the same rule (../.# => ##./#../...), three of which require some flipping and rotation to line up with the rule. The output for the rule is the same in all four cases:

##.|##.
#..|#..
...|...
---+---
##.|##.
#..|#..
...|...
Finally, the squares are joined into a new grid:

##.##.
#..#..
......
##.##.
#..#..
......
Thus, after 2 iterations, the grid contains 12 pixels that are on.

How many pixels stay on after 5 iterations?

Your puzzle answer was 186.

--- Part Two ---
How many pixels stay on after 18 iterations?

Your puzzle answer was 3018423.
*/

const assert = require('assert');

const input = `../.. => ##./###/...
#./.. => ..#/##./##.
##/.. => #.#/##./...
.#/#. => ##./###/###
##/#. => ###/.#./#.#
##/## => .#./.#./###
.../.../... => #.../.#.#/..##/#...
#../.../... => .##./#.##/##../##..
.#./.../... => ##../#.../.#.#/###.
##./.../... => .#.#/###./.#.#/.#..
#.#/.../... => .#.#/##../.#../###.
###/.../... => #.##/.##./..##/#.##
.#./#../... => #..#/...#/.###/.##.
##./#../... => .###/..#./#.../####
..#/#../... => ..../.#../#.##/....
#.#/#../... => ..##/.##./.##./....
.##/#../... => ###./#.../#.#./.#.#
###/#../... => .#../##.#/.#.#/..#.
.../.#./... => ####/##../..#./#..#
#../.#./... => ####/#.##/#..#/..#.
.#./.#./... => #.##/.#../.#../.#.#
##./.#./... => ..##/###./..../...#
#.#/.#./... => ...#/.#.#/.#../....
###/.#./... => ..../..#./#..#/##.#
.#./##./... => ##../.#.#/#.#./.#.#
##./##./... => ###./##.#/#.#./.##.
..#/##./... => ..#./.#.#/###./##.#
#.#/##./... => ##.#/.#../#.../#.#.
.##/##./... => ####/..../...#/#.##
###/##./... => ####/.###/.###/.###
.../#.#/... => .#.#/###./.##./.#..
#../#.#/... => #.##/#..#/#..#/##..
.#./#.#/... => ...#/##../..../#..#
##./#.#/... => #..#/.#../##.#/..##
#.#/#.#/... => ..../...#/..#./#..#
###/#.#/... => .##./#..#/...#/.##.
.../###/... => ..../#.##/.#../##..
#../###/... => .#.#/.###/###./#..#
.#./###/... => ...#/.#../###./.###
##./###/... => #..#/###./#.##/.#..
#.#/###/... => .#../##../###./.#.#
###/###/... => ###./.#.#/.##./###.
..#/.../#.. => ...#/#..#/###./.###
#.#/.../#.. => #.#./#.##/#.#./...#
.##/.../#.. => .#.#/#.#./..../#.##
###/.../#.. => ##.#/..##/.#.#/##..
.##/#../#.. => ####/#..#/.#.#/...#
###/#../#.. => .#.#/####/..##/.#.#
..#/.#./#.. => ##.#/.#../#.../.##.
#.#/.#./#.. => #..#/.#.#/#.#./#..#
.##/.#./#.. => #..#/..#./#.../...#
###/.#./#.. => #.##/.#../#.##/##.#
.##/##./#.. => .###/..../#..#/.##.
###/##./#.. => #.../.#.#/..#./.#..
#../..#/#.. => ..../##../#.../##.#
.#./..#/#.. => ..##/...#/###./##..
##./..#/#.. => .#.#/.###/...#/.#.#
#.#/..#/#.. => .#../..../.###/.##.
.##/..#/#.. => #.##/.##./.##./####
###/..#/#.. => #.../.#../..../#...
#../#.#/#.. => .#../.#.#/..##/###.
.#./#.#/#.. => ##.#/#.##/...#/#.##
##./#.#/#.. => .##./####/.#.#/.#..
..#/#.#/#.. => #.##/##.#/..#./.###
#.#/#.#/#.. => ###./.#../###./###.
.##/#.#/#.. => .#../.#../####/##.#
###/#.#/#.. => #.##/##.#/#.../##..
#../.##/#.. => ..#./.###/#.#./..#.
.#./.##/#.. => ##.#/##../..#./#...
##./.##/#.. => #.../..#./#.../.#..
#.#/.##/#.. => ..#./#.##/.##./####
.##/.##/#.. => #.#./.#../####/..##
###/.##/#.. => ...#/#..#/#.../.#..
#../###/#.. => ..../..../##.#/.##.
.#./###/#.. => ..##/..#./##../....
##./###/#.. => .#../..##/..../.#.#
..#/###/#.. => ...#/...#/..#./###.
#.#/###/#.. => ####/##.#/##../..##
.##/###/#.. => ..##/##../#..#/##..
###/###/#.. => ##.#/.##./...#/.#.#
.#./#.#/.#. => ###./####/.##./#..#
##./#.#/.#. => #.../..#./.##./##..
#.#/#.#/.#. => .##./####/##../.#.#
###/#.#/.#. => ##../..../.#.#/....
.#./###/.#. => ..##/##.#/.##./.#.#
##./###/.#. => #.../.#../..##/..#.
#.#/###/.#. => ####/.##./#..#/...#
###/###/.#. => ####/..../##.#/.#.#
#.#/..#/##. => ####/####/####/#...
###/..#/##. => #.#./####/##.#/####
.##/#.#/##. => .###/#.../#.../...#
###/#.#/##. => ..#./#.#./##../##.#
#.#/.##/##. => ###./###./#..#/.###
###/.##/##. => ##.#/..#./##../....
.##/###/##. => ##.#/###./.#.#/.##.
###/###/##. => #.##/.#.#/#..#/.##.
#.#/.../#.# => ..#./####/...#/#.##
###/.../#.# => .##./..#./####/#...
###/#../#.# => .##./##../..../###.
#.#/.#./#.# => #.##/#.##/#.##/#...
###/.#./#.# => ####/#.##/####/.###
###/##./#.# => .#.#/..../.#.#/#.##
#.#/#.#/#.# => ###./#.##/####/.###
###/#.#/#.# => .##./.##./.#.#/....
#.#/###/#.# => ##../..##/...#/.##.
###/###/#.# => .#../#.##/..##/.#..
###/#.#/### => ##.#/..#./...#/.###
###/###/### => ..##/###./.###/.###`;

function flip(pattern) {
  if (pattern.length === 2) {
    const [[a, b], [c, d]] = pattern;
    return [[b, a], [d, c]];
  } else if (pattern.length === 3) {
    const [[a, b, c], [d, e, f], [g, h, i]] = pattern;
    return [[c, b, a], [f, e, d], [i, h, g]];
  }
}

function rotate(pattern) {
  if (pattern.length === 2) {
    const [[a, b], [c, d]] = pattern;
    return [[c, a], [d, b]];
  } else if (pattern.length === 3) {
    const [[a, b, c], [d, e, f], [g, h, i]] = pattern;
    return [[g, d, a], [h, e, b], [i, f, c]];
  }
}

function toShorthand(pattern) {
  return pattern.map(r => r.join('')).join('/');
}

function fromShorthand(pattern) {
  return pattern.split('/').map(r => r.split(''));
}

function getEnhancement(pattern, rules) {
  return fromShorthand(rules[toShorthand(pattern)]);
}

function getSubgrids(grid) {
  const size = grid.length % 2 === 0 ? 2 : 3;
  let subgrids = [];
  for (let i = 0; i < grid.length; i += size) {
    for (let j = 0; j < grid.length; j += size) {
      let subgrid = [];
      for (let k = 0; k < size; k++) {
        subgrid.push(grid[i + k].slice(j, j + size));
      }
      subgrids.push(subgrid);
    }
  }
  return subgrids;
}

function mergeSubgrids(subgrids) {
  let subgridSize = subgrids[0].length;
  const gridSize = Math.sqrt(subgrids.length) * subgridSize;
  let grid = [];
  for (let i = 0; i < gridSize; i++) {
    grid[i] = Array(gridSize).fill('');
  }
  for (let i = 0; i < subgrids.length; i++) {
    for (let j = 0; j < subgridSize; j++) {
      for (let k = 0; k < subgridSize; k++) {
        const x = Math.floor(i * subgridSize / gridSize) * subgridSize + j;
        const y = ((i * subgridSize) % gridSize) + k;
        grid[x][y] = subgrids[i][j][k];
      }
    }
  }
  return grid;
}

function countOn(grid) {
  return grid.map(r => r.filter(x => x === '#').length).reduce((a, b) => a + b);
}

function day21(input, iterations) {
  let rules = {};
  input.split('\n').forEach(s => {
    rule = s.split(' => ');
    rules[rule[0]] = rule[1];
    rules[toShorthand(rotate(fromShorthand(rule[0])))] = rule[1];
    rules[toShorthand(rotate(rotate(fromShorthand(rule[0]))))] = rule[1];
    rules[toShorthand(rotate(rotate(rotate(fromShorthand(rule[0])))))] = rule[1];
    rules[toShorthand(flip(fromShorthand(rule[0])))] = rule[1];
    rules[toShorthand(flip(rotate(fromShorthand(rule[0]))))] = rule[1];
    rules[toShorthand(flip(rotate(rotate(fromShorthand(rule[0])))))] = rule[1];
    rules[toShorthand(flip(rotate(rotate(rotate(fromShorthand(rule[0]))))))] = rule[1];
  });

  let grid = fromShorthand(`.#./..#/###`);

  for (let i = 0; i < iterations; i++) {
    grid = mergeSubgrids(getSubgrids(grid).map((subgrid) => {
      return getEnhancement(subgrid, rules);
    }));
  }

  return countOn(grid);
}

assert.equal(day21(`../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`, 2), 12);
console.log(day21(input, 5)); // 186
console.log(day21(input, 18)); // 3018423
