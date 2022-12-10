import { readFileSync } from 'fs';

let trees = readFileSync('day-8/day-8-input.txt', 'utf-8')
    .replace(/\r/g, '')
    .split('\n');

const numRows = trees.length;
const numCols = trees[0].length;

function part1 () {
    let trees = trees.map(row => row.split('').map(cell => ({ isVisible: false, height: parseInt(cell) })));

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
}

function part2() {
    trees = trees.map(row => row.split('').map(cell => ({ height: parseInt(cell) })));

    let maxScenicScore = 0;
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const currentHeight = trees[row][col].height;

            // Check left to right
            let leftToRightViewingDistance = 0;
            if (col < numCols - 1) {
                for (let _col = col + 1; _col < numCols; _col++) {
                    if (trees[row][_col].height >= currentHeight) {
                        leftToRightViewingDistance++;
                        break;
                    } else if (trees[row][_col].height < currentHeight) {
                        leftToRightViewingDistance++;
                    }
                }
            }

            // Check right to left
            let rightToLeftViewingDistance = 0;
            if (col > 0) {
                for (let _col = col - 1; _col >= 0; _col--) {
                    if (trees[row][_col].height >= currentHeight) {
                        rightToLeftViewingDistance++;
                        break;
                    } else if (trees[row][_col].height < currentHeight) {
                        rightToLeftViewingDistance++;
                    }
                }
            }

            // Check bottom to top
            let bottomToTopViewingDistance = 0;
            if (row > 0) {
                for (let _row = row - 1; _row >= 0; _row--) {
                    if (trees[_row][col].height >= currentHeight) {
                        bottomToTopViewingDistance++;
                        break;
                    } else if (trees[_row][col].height < currentHeight) {
                        bottomToTopViewingDistance++;
                    }
                }
            }

            // Check top to bottom
            let topToBottomViewingDistance = 0;
            if (row < numRows - 1) {
                for (let _row = row + 1; _row < numRows; _row++) {
                    if (trees[_row][col].height >= currentHeight) {
                        topToBottomViewingDistance++;
                        break;
                    } else if (trees[_row][col].height < currentHeight) {
                        topToBottomViewingDistance++;
                    }
                }
            }

            const scenicScore = leftToRightViewingDistance * rightToLeftViewingDistance * topToBottomViewingDistance * bottomToTopViewingDistance;
            if (scenicScore > maxScenicScore) {
                maxScenicScore = scenicScore;
            }
        }
    }

    console.log('max scenic score', maxScenicScore);
}

part2();