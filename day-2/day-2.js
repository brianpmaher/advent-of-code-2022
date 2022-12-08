import { readFileSync } from 'fs';

const part1Results = () =>
  readFileSync("day-2/day-2-input.txt", 'utf-8')
    .replace(/\r/g, '')
    .split('\n')
    .map(([opponentMove, _, yourMove]) => ({
      opponentMove: { A: 'rock', B: 'paper', C: 'scissors' }[opponentMove],
      yourMove: { X: 'rock', Y: 'paper', Z: 'scissors' }[yourMove]
    }))
    .map(({ opponentMove, yourMove }) =>
      ({ rock: 1, paper: 2, scissors: 3 }[yourMove] + ({
        [(opponentMove === 'rock' && yourMove === 'scissors')
          || (opponentMove === 'paper' && yourMove === 'rock')
          || (opponentMove === 'scissors' && yourMove === 'paper')]: 0,
        [opponentMove === yourMove]: 3,
        [(opponentMove === 'rock' && yourMove === 'paper')
          || (opponentMove === 'paper' && yourMove === 'scissors')
          || (opponentMove === 'scissors' && yourMove === 'rock')]: 6
      }[true])))
    .reduce((sum, val) => sum + val, 0)

const part2Results = () =>
  readFileSync("day-2/day-2-input.txt", 'utf-8')
    .replace(/\r/g, '')
    .split('\n')
    .map(([opponentMove, _, yourMove]) => ({
      opponentMove: {A: 'rock', B: 'paper', C: 'scissors'}[opponentMove],
      yourMove: {
        X: {A: 'scissors', B: 'rock', C: 'paper'}[opponentMove],
        Y: {A: 'rock', B: 'paper', C: 'scissors'}[opponentMove],
        Z: {A: 'paper', B: 'scissors', C: 'rock'}[opponentMove],
      }[yourMove],
    }))
    .map(({ opponentMove, yourMove }) =>
      ({ rock: 1, paper: 2, scissors: 3 }[yourMove] + ({
        [(opponentMove === 'rock' && yourMove === 'scissors')
        || (opponentMove === 'paper' && yourMove === 'rock')
        || (opponentMove === 'scissors' && yourMove === 'paper')]: 0,
        [opponentMove === yourMove]: 3,
        [(opponentMove === 'rock' && yourMove === 'paper')
        || (opponentMove === 'paper' && yourMove === 'scissors')
        || (opponentMove === 'scissors' && yourMove === 'rock')]: 6
      }[true])))
    .reduce((sum, val) => sum + val, 0)

console.log('part1', part1Results());
console.log('part2', part2Results());
