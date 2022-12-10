import { readFileSync } from 'fs';

const trees = readFileSync('day-8/day-8-input.txt', 'utf-8')
    .replace(/\r/g, '')
    .split('\n')
    .map(row => row.split('').map(cell => ({ isVisible: false, height: parseInt(cell) })));

const numRows = trees.length;
const numCols = trees[0].length;

// Borders are all visible
for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
        if (row === 0 || col === 0 || row === numRows - 1 || col === numCols - 1) {
            trees[row][col].isVisible = true;
        }
    }
}

// Check left to right
for (let row = 1; row < numRows - 1; row++) {
    let tallestTree = trees[row][0].height;
    for (let col = 1; col < numCols - 1; col++) {
        if (trees[row][col].height > tallestTree) {
            trees[row][col].isVisible = true;
            tallestTree = trees[row][col].height;
        }
    }
}

// Check top to bottom
for (let col = 1; col < numCols - 1; col++) {
    let tallestTree = trees[0][col].height;
    for (let row = 1; row < numRows - 1; row++) {
        if (trees[row][col].height > tallestTree) {
            trees[row][col].isVisible = true;
            tallestTree = trees[row][col].height;
        }
    }
}

// Check right to left
for (let row = 1; row < numRows - 1; row++) {
    let tallestTree = trees[row][numCols - 1].height;
    for (let col = numCols - 1; col > 0; col--) {
        if (trees[row][col].height > tallestTree) {
            trees[row][col].isVisible = true;
            tallestTree = trees[row][col].height;
        }
    }
}

// Check bottom to top
for (let col = 1; col < numCols - 1; col++) {
    let tallestTree = trees[numRows - 1][col].height;
    for (let row = numRows - 1; row > 0; row--) {
        if (trees[row][col].height > tallestTree) {
            trees[row][col].isVisible = true;
            tallestTree = trees[row][col].height;
        }
    }
}

let sum = 0;
for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
        if (trees[row][col].isVisible) {
            sum++;
        }
    }
}

console.log('sum trees visible', sum);