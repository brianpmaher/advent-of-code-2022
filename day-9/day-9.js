import { readFileSync } from 'fs';

const UP = 'U';
const DOWN = 'D';
const LEFT = 'L';
const RIGHT = 'R';

const fileLines = readFileSync('day-9/day-9-input.txt', 'utf-8')
    .replace(/\r/g, '')
    .split('\n');

function parseInstructions(rawList) {
    return rawList
        .map(line => {
            const [direction, numStr] = line.split(' ');
            return {
                direction,
                number: parseInt(numStr),
            };
        });
}

const pos = (x, y) => ({ x, y });
const clone = ({ x, y }) => pos(x, y);

// Part 1
// let head = pos(0, 0);
// let tail = clone(head);
// let visitedPositions = [clone(tail)];
// for (const instruction of instructions) {
//     for (let i = 0; i < instruction.number; i++) {
//         // Move head
//         switch (instruction.direction) {
//             case UP: head.y++; break;
//             case DOWN: head.y--; break;
//             case LEFT: head.x--; break;
//             case RIGHT: head.x++; break;
//         }
//
//         // Check if tail is too far
//         const delta = pos(head.x - tail.x, head.y - tail.y);
//         if (delta.x === 2 && delta.y === 0) {
//             tail.x++;
//         } else if (delta.x === -2 && delta.y === 0) {
//             tail.x--;
//         } else if (delta.x === 0 && delta.y === 2) {
//             tail.y++;
//         } else if (delta.x === 0 && delta.y === -2) {
//             tail.y--;
//         } else if ((delta.x === 1 && delta.y === 2) || (delta.x === 2 && delta.y === 1)) {
//             tail.x++;
//             tail.y++;
//         } else if ((delta.x === -1 && delta.y === 2) || (delta.x === -2 && delta.y === 1)) {
//             tail.x--;
//             tail.y++;
//         } else if ((delta.x === 1 && delta.y === -2) || (delta.x === 2 && delta.y === -1)) {
//             tail.x++;
//             tail.y--;
//         } else if ((delta.x === -1 && delta.y === -2) || (delta.x === -2 && delta.y === -1)) {
//             tail.x--;
//             tail.y--;
//         }
//
//         if (!visitedPositions.some(visitedPosition => visitedPosition.x === tail.x && visitedPosition.y === tail.y)) {
//             visitedPositions.push(clone(tail));
//         }
//     }
// }

// Part 2
function ropeSim(instructions) {
    const numSegments = 10;
    let segments = [];
    for (let i = 0; i < numSegments; i++) {
        segments.push(pos(0, 0));
    }

    const head = segments[0];
    const tail = segments[numSegments - 1];

    let visitedPositions = [clone(tail)];

    for (const instruction of instructions) {
        // for each movement
        for (let i = 0; i < instruction.number; i++) {
            // Move head
            switch (instruction.direction) {
                case UP:
                    head.y++;
                    break;
                case DOWN:
                    head.y--;
                    break;
                case LEFT:
                    head.x--;
                    break;
                case RIGHT:
                    head.x++;
                    break;
            }

            // for each rope segment
            for (let j = 0; j < numSegments - 1; j++) {
                const newHead = segments[j];
                const newTail = segments[j + 1]

                // Check if tail is too far
                const delta = pos(newHead.x - newTail.x, newHead.y - newTail.y);
                if (delta.x === 2 && delta.y === 0) {
                    newTail.x++;
                } else if (delta.x === -2 && delta.y === 0) {
                    newTail.x--;
                } else if (delta.x === 0 && delta.y === 2) {
                    newTail.y++;
                } else if (delta.x === 0 && delta.y === -2) {
                    newTail.y--;
                } else if ((delta.x === 1 && delta.y === 2) || (delta.x === 2 && delta.y === 1) || (delta.x === 2 && delta.y === 2)) {
                    newTail.x++;
                    newTail.y++;
                } else if ((delta.x === -1 && delta.y === 2) || (delta.x === -2 && delta.y === 1) || (delta.x === -2 && delta.y === 2)) {
                    newTail.x--;
                    newTail.y++;
                } else if ((delta.x === 1 && delta.y === -2) || (delta.x === 2 && delta.y === -1) || (delta.x === 2 && delta.y === -2)) {
                    newTail.x++;
                    newTail.y--;
                } else if ((delta.x === -1 && delta.y === -2) || (delta.x === -2 && delta.y === -1) || (delta.x === -2 && delta.y === -2)) {
                    newTail.x--;
                    newTail.y--;
                }
            }

            const hasNotVisitedAlready = !visitedPositions.some(visitedPosition => visitedPosition.x === tail.x && visitedPosition.y === tail.y);
            if (hasNotVisitedAlready)
                visitedPositions.push(clone(tail));
        }
    }

    return visitedPositions.length;
}

// TODO: 1 is too low
// TODO: 81 is wrong
// TODO: 2642 is too high
const largeExample = ['R 5', 'U 8', 'L 8', 'D 3', 'R 17', 'D 10', 'L 25', 'U 20'];
const smallExample = ['R 4', 'U 4', 'L 3', 'D 1', 'R 4', 'D 1', 'L 5', 'R 2'];
console.log('num visited', ropeSim(parseInstructions(fileLines)));