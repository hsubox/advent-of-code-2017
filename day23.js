/*
--- Day 23: Coprocessor Conflagration ---
You decide to head directly to the CPU and fix the printer from there. As you get close, you find an experimental coprocessor doing so much work that the local programs are afraid it will halt and catch fire. This would cause serious issues for the rest of the computer, so you head in and see what you can do.

The code it's running seems to be a variant of the kind you saw recently on that tablet. The general functionality seems very similar, but some of the instructions are different:

set X Y sets register X to the value of Y.
sub X Y decreases register X by the value of Y.
mul X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
jnz X Y jumps with an offset of the value of Y, but only if the value of X is not zero. (An offset of 2 skips the next instruction, an offset of -1 jumps to the previous instruction, and so on.)
Only the instructions listed above are used. The eight registers here, named a through h, all start at 0.

The coprocessor is currently set to some kind of debug mode, which allows for testing, but prevents it from doing any meaningful work.

If you run the program (your puzzle input), how many times is the mul instruction invoked?

Your puzzle answer was 8281.

--- Part Two ---
Now, it's time to fix the problem.

The debug mode switch is wired directly to register a. You flip the switch, which makes register a now start at 1 when the program is executed.

Immediately, the coprocessor begins to overheat. Whoever wrote this program obviously didn't choose a very efficient implementation. You'll need to optimize the program if it has any hope of completing before Santa needs that printer working.

The coprocessor's ultimate goal is to determine the final value left in register h once the program completes. Technically, if it had that... it wouldn't even need to run the program.

After setting register a to 1, if the program were to run to completion, what value would be left in register h?

Your puzzle answer was 911.
*/

const assert = require('assert');

const input = `set b 93
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23`;

function day23_part1(input) {
  let registers = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
  };
  let multiplys = 0;

  const instructions = input.split('\n');

  for (var i = 0; i < instructions.length; i++) {
    const regex = /(\w{3}) (\w) ?(-?[\d\w]*)?/;
    if (regex.test(instructions[i])) {
      const result = regex.exec(instructions[i]);
      const instruction = result[1];
      const register = result[2];
      let value = result[3];
      if (!isNaN(value)) {
        value = Number(value);
      } else if (value !== undefined) {
        value = registers[value] || 0;
      }

      switch(instruction) {
        case 'set':
          registers[register] = value;
          break;
        case 'sub':
          registers[register] -= value;
          break;
        case 'mul':
          registers[register] *= value;
          multiplys += 1;
          break;
        case 'jnz':
          if (registers[register] !== 0) {
            i += value - 1;
          }
          break;
      }
    }
  }

  return multiplys;
}

console.log(day23_part1(input)); // 8281

function isPrime(n) {
  for (let i = 2; i < Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function day23_part2() {
  let h = 0;
  for (let b = 109300; b <= 126300; b += 17) {
    if (!isPrime(b)) {
      h += 1;
    }
  }
  return h;
}

console.log(day23_part2()); // 911
