import { readFileSync } from 'fs';

const UP = 'U';
const DOWN = 'D';
const LEFT = 'L';
const RIGHT = 'R';

const instructions = readFileSync('day-9/day-9-input.txt', 'utf-8')
    .replace(/\r/g, '')
    .split('\n')
    .map(line => {
        const [direction, numStr] = line.split(' ');
        return {
            direction,
            number: parseInt(numStr),
        };
    });

const pos = (x, y) => ({ x, y });
const clone = ({ x, y }) => pos(x, y);

let head = pos(0, 0);
let tail = clone(head);
let visitedPositions = [clone(tail)];
for (const instruction of instructions) {
    for (let i = 0; i < instruction.number; i++) {
        // Move head
        switch (instruction.direction) {
            case UP: head.y++; break;
            case DOWN: head.y--; break;
            case LEFT: head.x--; break;
            case RIGHT: head.x++; break;
        }

        // Check if tail is too far
        const delta = pos(head.x - tail.x, head.y - tail.y);
        if (delta.x === 2 && delta.y === 0) {
            tail.x++;
        } else if (delta.x === -2 && delta.y === 0) {
            tail.x--;
        } else if (delta.x === 0 && delta.y === 2) {
            tail.y++;
        } else if (delta.x === 0 && delta.y === -2) {
            tail.y--;
        } else if ((delta.x === 1 && delta.y === 2) || (delta.x === 2 && delta.y === 1)) {
            tail.x++;
            tail.y++;
        } else if ((delta.x === -1 && delta.y === 2) || (delta.x === -2 && delta.y === 1)) {
            tail.x--;
            tail.y++;
        } else if ((delta.x === 1 && delta.y === -2) || (delta.x === 2 && delta.y === -1)) {
            tail.x++;
            tail.y--;
        } else if ((delta.x === -1 && delta.y === -2) || (delta.x === -2 && delta.y === -1)) {
            tail.x--;
            tail.y--;
        }

        if (!visitedPositions.some(visitedPosition => visitedPosition.x === tail.x && visitedPosition.y === tail.y)) {
            visitedPositions.push(clone(tail));
        }
    }
}

console.log('num visited', visitedPositions.length);