import { readFileSync } from 'fs';

//     [P]                 [Q]     [T]
// [F] [N]             [P] [L]     [M]
// [H] [T] [H]         [M] [H]     [Z]
// [M] [C] [P]     [Q] [R] [C]     [J]
// [T] [J] [M] [F] [L] [G] [R]     [Q]
// [V] [G] [D] [V] [G] [D] [N] [W] [L]
// [L] [Q] [S] [B] [H] [B] [M] [L] [D]
// [D] [H] [R] [L] [N] [W] [G] [C] [R]
//  1   2   3   4   5   6   7   8   9
const stacks = {
  1: ['D', 'L', 'V', 'T', 'M', 'H', 'F'],
  2: ['H', 'Q', 'G', 'J', 'C', 'T', 'N', 'P'],
  3: ['R', 'S', 'D', 'M', 'P', 'H'],
  4: ['L', 'B', 'V', 'F'],
  5: ['N', 'H', 'G', 'L', 'Q'],
  6: ['W', 'B', 'D', 'G', 'R', 'M', 'P'],
  7: ['G', 'M', 'N', 'R', 'C', 'H', 'L', 'Q'],
  8: ['C', 'L', 'W'],
  9: ['R', 'D', 'L', 'Q', 'J', 'Z', 'M', 'T']
}

// Part 1
// readFileSync('day-5/day-5-input.txt', 'utf-8')
//   .replace(/\r/g, '')
//   .split('\n')
//   .slice(10)
//   .map(line => {
//     const numbers = line
//       .replace('move ', '')
//       .replace(' from ', ',')
//       .replace(' to ', ',')
//       .split(',')
//       .map(numStr => parseInt(numStr));
//
//     return {
//       move: numbers[0],
//       from: numbers[1],
//       to: numbers[2]
//     }
//   })
//   .forEach(({ move, from, to }) => {
//     for (let i = 0; i < move; i++) {
//       const crate = stacks[from].pop();
//       stacks[to].push(crate);
//     }
//   });

// Part 2
readFileSync('day-5/day-5-input.txt', 'utf-8')
  .replace(/\r/g, '')
  .split('\n')
  .slice(10)
  .map(line => {
    const numbers = line
      .replace('move ', '')
      .replace(' from ', ',')
      .replace(' to ', ',')
      .split(',')
      .map(numStr => parseInt(numStr));

    return {
      move: numbers[0],
      from: numbers[1],
      to: numbers[2]
    }
  })
  .forEach(({ move, from, to }) => {
    const cratesToMove = [];
    for (let i = 0; i < move; i++) {
      const crate = stacks[from].pop();
      cratesToMove.push(crate);
    }

    const startingLength = cratesToMove.length;
    for (let i = 0; i < startingLength; i++) {
      const crate = cratesToMove.pop();
      stacks[to].push(crate);
    }
  });

let answer = ''
for (const stackNumber of Object.keys(stacks)) {
  const stack = stacks[stackNumber];
  answer += stack[stack.length - 1];
}

console.log('Part 2 answer: ' + answer);