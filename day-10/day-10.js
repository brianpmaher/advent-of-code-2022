import { readFileSync } from 'fs';

// TODO: 14360 is too high

////////////////////////////////////////////////////////////////////////////////
//                                Workspace
////////////////////////////////////////////////////////////////////////////////

const instructions = parseInstructions('day-10-input.txt');

// const signal = getSignalAtCycleNumber(instructions, 5);
//
const sum = [20, 60, 100, 140, 180, 220].map(numCycles => {
    const signalStrength = getSignalAtCycleNumber(instructions, numCycles);
    console.log(`${numCycles}th cycle`, signalStrength);
    return signalStrength;
}).reduce((sum, val) => sum + val, 0);
console.log('sum', sum);

////////////////////////////////////////////////////////////////////////////////
//                                Functions
////////////////////////////////////////////////////////////////////////////////

function parseInstructions(fileName) {
    return readFileSync(`day-10/${fileName}`, 'utf-8')
        .replace(/\r/g, '')
        .split('\n')
        .map(line => {
            const splitLine = line.split(' ');
            if (splitLine[0] === 'noop') {
                return {
                    instruction: 'noop'
                }
            } else {
                return {
                    instruction: 'addx',
                    number: parseInt(splitLine[1])
                }
            }
        });
}

function getSignalAtCycleNumber(instructions, cycleNumber) {
    const instructionToNumCycles = { addx: 2, noop: 1 };
    let x = 1;
    let numCycles = 1;

    // For each instruction
    for (const { instruction, number } of instructions) {
        // For each cycle time for each instruction
        for (let instructionCycle = 1; instructionCycle <= instructionToNumCycles[instruction]; instructionCycle++) {
            if (cycleNumber === numCycles) {
                return numCycles * x;
            }

            numCycles++;
        }

        // At the end of the instruction cycle, do the operation
        if (instruction === 'addx') {
            x += number;
        }
    }

    return numCycles * x;
}
