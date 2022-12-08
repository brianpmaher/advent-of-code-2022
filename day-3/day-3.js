import { readFileSync } from 'fs';

const letterValues = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  .split('')
  .map((letter, i) => ({ letter, value: i + 1 }));

// const answer1 = readFileSync('day-3/day-3-input.txt', 'utf-8')
//   .replace(/\r/g, '')
//   .split('\n')
//   .map((sack) => {
//     const halfIndex = sack.length / 2;
//     const firstHalf = sack.slice(0, halfIndex);
//     const secondHalf = sack.slice(halfIndex, sack.length);
//     let duplicateItem = null;
//
//     for (const firstHalfItem of firstHalf) {
//       if (duplicateItem != null) break;
//       for (const secondHalfItem of secondHalf) {
//         if (duplicateItem != null) break;
//         if (firstHalfItem === secondHalfItem) {
//           duplicateItem = firstHalfItem;
//         }
//       }
//     }
//
//     return duplicateItem;
//   })
//   .map((item) => letterValues.find(({ letter }) => letter === item).value)
//   .reduce((sum, value) => sum + value, 0);

const answer2 = readFileSync('day-3/day-3-input.txt', 'utf-8')
  .replace(/\r/g, '')
  .split('\n')
  .reduce((arr, row, i) => {
    const j = Math.floor(i / 3);
    if (i % 3 === 0)
      return [...arr, [row]];
    return [...arr.slice(0, j), [...arr[j], row]];
  }, [])
  .map(([firstSack, secondSack, thirdSack]) => {
    let duplicateItem;

    for (const firstItem of firstSack) {
      if (duplicateItem != null) break;
      for (const secondItem of secondSack) {
        if (duplicateItem != null) break;
        for (const thirdItem of thirdSack) {
          if (duplicateItem != null) break;
          if (firstItem === secondItem && secondItem === thirdItem) {
            duplicateItem = firstItem;
          }
        }
      }
    }

    return duplicateItem;
  })
  .map(item => letterValues.find(({ letter }) => letter === item).value)
  .reduce((sum, val) => sum + val, 0);

console.log(`Part 2: ${answer2}`);
