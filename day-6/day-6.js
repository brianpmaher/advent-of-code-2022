import { readFileSync } from 'fs';

const dataStream = readFileSync('day-6/day-6-input.txt', 'utf-8').split('');

const queue = [];
let i = 0;
for (; i < dataStream.length; i++) {
  const char = dataStream[i];
  if (queue.length < 4) {
    queue.push(char);
  } else {
    let anyMatch = false;
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        if (j !== k && queue[j] === queue[k]) {
          anyMatch = true;
        }
      }
    }
    if (anyMatch) {
      queue.shift();
      queue.push(char);
    } else {
      break;
    }
  }
}

console.log('part 1: ', i);
