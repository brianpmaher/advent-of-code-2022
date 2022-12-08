import { readFileSync } from 'fs';

const lines = readFileSync('day-7/day-7-input.txt', 'utf-8')
  .replace(/\r/g, '')
  .split('\n')
  .map(line => line.split(' '));

const buildDirectory = (parent, directory) => ({
  parent,
  directory,
  directories: {},
  files: {},
});

const buildFile = (file, size) => ({
  file,
  size,
});

let fileTree = buildDirectory(null, '/');

let cursor = fileTree;

for (const line of lines) {
  if (line[0] === '$') {
    const command = line[1];
    if (command === 'cd') {
      const directory = line[2];
      if (directory === '/') {
        cursor = fileTree;
      } else if (directory === '..') {
        cursor = cursor.parent;
      } else {
        cursor = cursor.directories[directory];
      }
    } else if (command === 'ls') {
      continue;
    }
  } else {
    if (line[0] === 'dir') {
      const directory = line[1];
      cursor.directories[directory] = buildDirectory(cursor, directory);
    } else {
      const size = parseInt(line[0]);
      const file = line[1];
      cursor.files[file] = buildFile(file, size);
    }
  }
}

const directoriesUnder100000 = [];

const calculateTotalSizes = (directory) => {
  const directories = Object.keys(directory.directories);
  let sum = 0;

  // Total up all files
  for (const file of Object.keys(directory.files)) {
    sum += directory.files[file].size;
  }

  // Total up all directories
  if (directories.length > 0) {
    for (const innerDirectory of directories) {
      sum += calculateTotalSizes(directory.directories[innerDirectory]);
    }
  }

  directory.size = sum;

  if (directory.size <= 100000) {
    directoriesUnder100000.push(directory);
  }

  return sum;
};

calculateTotalSizes(fileTree);

console.log('part 1', directoriesUnder100000.reduce((sum, directory) => sum + directory.size, 0));

