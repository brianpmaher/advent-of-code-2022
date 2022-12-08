import { readFileSync } from 'fs';

const dataStream = readFileSync('day-6/day-6-input.txt', 'utf-8').split('');

const findStartOfStreamMarker = (numDistinct) => {
  const queue = [];
  let i = 0;

  for (; i < dataStream.length; i++) {
    const char = dataStream[i];
    if (queue.length < numDistinct) {
      queue.push(char);
    } else {
      let anyMatch = false;
      for (let j = 0; j < numDistinct; j++) {
        for (let k = 0; k < numDistinct; k++) {
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

  return i;
}


console.log('part 1: ', findStartOfStreamMarker(4));
console.log('part 2: ', findStartOfStreamMarker(14));
