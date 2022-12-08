import { readFileSync } from 'fs';

// const answer1 = readFileSync('day-4/day-4-input.txt', 'utf-8')
//   .replace(/\r/g, '')
//   .split('\n')
//   .map(row => row.split(',').map(pairItem => {
//     const splitPairItem = pairItem.split('-');
//     return {
//       min: parseInt(splitPairItem[0]),
//       max: parseInt(splitPairItem[1])
//     }
//   }))
//   .filter(([firstElf, secondElf]) =>
//     (firstElf.min <= secondElf.min && firstElf.max >= secondElf.max) ||
//     (secondElf.min <= firstElf.min && secondElf.max >= firstElf.max))
//   .reduce((arr) => arr + 1, 0);
//
// console.log(`Part 1 answer: ${answer1}`);
const answer2 = readFileSync('day-4/day-4-input.txt', 'utf-8')
  .replace(/\r/g, '')
  .split('\n')
  .map(row => row.split(',').map(pairItem => {
    const splitPairItem = pairItem.split('-');
    return {
      min: parseInt(splitPairItem[0]),
      max: parseInt(splitPairItem[1])
    }
  }))
  .filter(([first, second]) =>
    (first.min <= second.max && first.max >= second.min) ||
    (second.min <= first.max && second.max >= first.min))
  .reduce((arr) => arr + 1, 0);

console.log(`Part 2 answer: ${answer2}`);
