import { readFileSync } from 'fs';

const data = readFileSync("day-1/day-1-input.txt", "utf-8")
  .replace(/\r/g, '')
  .split('\n\n')
  .map(elfStr => elfStr
    .split('\n')
    .map(numStr => parseInt(numStr)))
  .map(elfCals => elfCals
    .reduce((sum, cur) => sum + cur, 0))
  .sort((a, b) => b - a);

console.log(`Most calories: ${data[0]}`);
console.log(`Top-3 most calories: ${data[0] + data[1] + data[2]}`)

