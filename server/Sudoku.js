// import { SudokuUtil } from "./SudokuUtil.js";
// import { Util } from "./Util.js";

// export class Sudoku {
//   constructor(sudoku) {
//     if (!sudoku) {
//       this.sudoku = createPuzzle();
//     } else {
//       this.sudoku = sudoku;
//     }
//     this.solvedSudoku = [];
//     this.isValidSudoku = false;
//     this.isSolved = false;
//   }

//   /**
//    * *getter method for random sudoku.
//    * @params  none
//    * @returns this.sudoku
//    */
//   get puzzle() {
//     return this.sudoku;
//   }

//   /**
//    * *getter method for solution of the sudoku.
//    * @params  none
//    * @returns this.solvedSudoku
//    */
//   get solvedPuzzle() {
//     return this.solvedSudoku;
//   }

//   /**
//    * *method to validate solution of the sudoku.
//    * @params  none
//    * @returns true if the solved puzzle is valid false otherwise
//    */
//   validate() {
//     return isValidSolution(this.sudoku);
//   }

//   /**
//    * *getter method to find whether the current sudoku is solvable(valid).
//    * @params  none
//    * @returns true if the puzzle is valid - saves the solution to this.solvedSudoku
//    *          false if the puzzle is valid but doesn't have any solution
//    * @throws "Invalid Puzzle" if the puzzle is invalid
//    */
//   isSolvable() {
//     this.isValidSudoku = isValidPuzzle(this.sudoku);
//     if (this.isValidSudoku) {
//       Util.copyGrid(this.sudoku, this.solvedSudoku);
//       return solve(this.solvedSudoku);
//     } else {
//       return false;
//     }
//   }
// }

// function isValidPuzzle(grid) {
//   if (SudokuUtil.isValidPuzzle(grid)) {
//     return true;
//   }
//   return false;
// }

// function isValidSolution(grid) {
//   for (let i = 0; i < 9; i++) {
//     for (let j = 0; j < 9; j++) {
//       if (grid[i][j] === 0) {
//         return false;
//       }
//     }
//   }
//   return SudokuUtil.isValidPuzzle(grid);
// }

// function solve(grid) {
//   for (let row = 0; row < 9; row++) {
//     for (let col = 0; col < 9; col++) {
//       if (grid[row][col] === 0) {
//         for (let possibleNumber = 1; possibleNumber <= 9; possibleNumber++) {
//           if (SudokuUtil.isValidPlace(grid, row, col, possibleNumber)) {
//             grid[row][col] = possibleNumber;
//             if (solve(grid)) {
//               return true;
//             }
//             grid[row][col] = 0;
//           }
//         }
//         return false;
//       }
//     }
//   }
//   return true;
// }

// function createPuzzle() {
//   let puzzle = getRandomSudoku();
//   let solution = solve(puzzle);
//   if (solution) {
//     for (let i = 0; i < 9; i++) {
//       for (let j = 0; j < 9; j++) {
//         if (Math.random() > 0.3) puzzle[i][j] = 0;
//       }
//     }
//   }
//   return puzzle;
// }

// function getRandomSudoku() {
//   const randomSudoku = [];
//   for (let i = 0; i < 9; i++) {
//     randomSudoku[i] = Array(9).fill(0);
//   }
//   for (let i = 0; i < 8; i++) {
//     let number = Math.floor(Math.random() * 8) + 1;
//     while (!SudokuUtil.isValidPlace(randomSudoku, 0, i, number)) {
//       number = Math.floor(Math.random() * 8) + 1;
//     }
//     if (SudokuUtil.isValidPlace(randomSudoku, 0, i, number)) {
//       randomSudoku[0][i] = number;
//     }
//   }
//   return randomSudoku;
// }

// // import { SudokuUtil } from "./SudokuUtil.js";
// // import { Util } from "./Util.js";

// // // Optimized Solver Class
// // class OptimizedSolver {
// //   constructor() {
// //     this.size = 9;
// //   }

// //   solve(grid) {
// //     const workingGrid = grid.map(row => [...row]);
// //     const possibilities = Array(this.size).fill().map(() => 
// //       Array(this.size).fill().map(() => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]))
// //     );

// //     // Initialize constraints from pre-filled cells
// //     for (let r = 0; r < this.size; r++) {
// //       for (let c = 0; c < this.size; c++) {
// //         if (workingGrid[r][c] !== 0) {
// //           if (!this.applyConstraints(workingGrid, r, c, workingGrid[r][c], possibilities)) {
// //             return false;
// //           }
// //         }
// //       }
// //     }

// //     return this.backtrack(workingGrid, possibilities);
// //   }

// //   applyConstraints(grid, row, col, value, possibilities) {
// //     for (let i = 0; i < 9; i++) {
// //       if (i !== col && !this.removeCandidate(possibilities, row, i, value, grid)) 
// //         return false;
// //       if (i !== row && !this.removeCandidate(possibilities, i, col, value, grid)) 
// //         return false;
      
// //       const boxRow = Math.floor(row / 3) * 3 + Math.floor(i / 3);
// //       const boxCol = Math.floor(col / 3) * 3 + (i % 3);
// //       if ((boxRow !== row || boxCol !== col) && 
// //           !this.removeCandidate(possibilities, boxRow, boxCol, value, grid)) 
// //         return false;
// //     }
// //     return true;
// //   }

// //   removeCandidate(possibilities, row, col, value, grid) {
// //     if (grid[row][col] !== 0) return true;
    
// //     const candidates = possibilities[row][col];
// //     if (!candidates.has(value)) return true;
    
// //     candidates.delete(value);
    
// //     if (candidates.size === 0) return false;
    
// //     if (candidates.size === 1) {
// //       const [lastVal] = candidates;
// //       grid[row][col] = lastVal;
// //       return this.applyConstraints(grid, row, col, lastVal, possibilities);
// //     }
// //     return true;
// //   }

// //   backtrack(grid, possibilities) {
// //     let minCandidates = Infinity;
// //     let targetR = -1, targetC = -1;
    
// //     for (let r = 0; r < this.size; r++) {
// //       for (let c = 0; c < this.size; c++) {
// //         if (grid[r][c] === 0) {
// //           const count = possibilities[r][c].size;
// //           if (count < minCandidates) {
// //             minCandidates = count;
// //             targetR = r;
// //             targetC = c;
// //           }
// //         }
// //       }
// //     }

// //     if (minCandidates === Infinity) return grid;
// //     if (minCandidates === 0) return false;

// //     const candidates = [...possibilities[targetR][targetC]];
    
// //     for (const num of candidates) {
// //       const newGrid = grid.map(row => [...row]);
// //       const newPossibilities = possibilities.map(row => 
// //         row.map(cell => new Set(cell))
// //       );

// //       newGrid[targetR][targetC] = num;
// //       if (this.applyConstraints(newGrid, targetR, targetC, num, newPossibilities)) {
// //         const result = this.backtrack(newGrid, newPossibilities);
// //         if (result) return result;
// //       }
// //     }
    
// //     return false;
// //   }
// // }

// // // Initialize optimized solver
// // const optimizedSolver = new OptimizedSolver();

// // // Helper function to shuffle arrays
// // function shuffleArray(array) {
// //   for (let i = array.length - 1; i > 0; i--) {
// //     const j = Math.floor(Math.random() * (i + 1));
// //     [array[i], array[j]] = [array[j], array[i]];
// //   }
// // }

// // export class Sudoku {
// //   constructor(sudoku) {
// //     if (!sudoku) {
// //       this.sudoku = createPuzzle();
// //     } else {
// //       this.sudoku = sudoku;
// //     }
// //     this.solvedSudoku = [];
// //     this.isValidSudoku = false;
// //     this.isSolved = false;
// //   }

// //   get puzzle() {
// //     return this.sudoku;
// //   }

// //   get solvedPuzzle() {
// //     return this.solvedSudoku;
// //   }

// //   validate() {
// //     return isValidSolution(this.sudoku);
// //   }

// //   isSolvable() {
// //     this.isValidSudoku = isValidPuzzle(this.sudoku);
// //     if (this.isValidSudoku) {
// //       Util.copyGrid(this.sudoku, this.solvedSudoku);
// //       return solve(this.solvedSudoku);
// //     } else {
// //       return false;
// //     }
// //   }
// // }

// // function isValidPuzzle(grid) {
// //   if (SudokuUtil.isValidPuzzle(grid)) {
// //     return true;
// //   }
// //   return false;
// // }

// // function isValidSolution(grid) {
// //   for (let i = 0; i < 9; i++) {
// //     for (let j = 0; j < 9; j++) {
// //       if (grid[i][j] === 0) {
// //         return false;
// //       }
// //     }
// //   }
// //   return SudokuUtil.isValidPuzzle(grid);
// // }

// // // OPTIMIZED SOLVE FUNCTION
// // function solve(grid) {
// //   const result = optimizedSolver.solve(grid);
// //   if (result) {
// //     // Copy result back to original grid
// //     for (let i = 0; i < 9; i++) {
// //       for (let j = 0; j < 9; j++) {
// //         grid[i][j] = result[i][j];
// //       }
// //     }
// //     return true;
// //   }
// //   return false;
// // }

// // // FIXED: Generate valid completed Sudoku first
// // function getRandomSudoku() {
// //   const grid = Array(9).fill().map(() => Array(9).fill(0));
  
// //   // Fill diagonal boxes (independent subgrids)
// //   for (let box = 0; box < 3; box++) {
// //     const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// //     shuffleArray(numbers);
    
// //     let idx = 0;
// //     const startRow = box * 3;
// //     const startCol = box * 3;
    
// //     for (let i = 0; i < 3; i++) {
// //       for (let j = 0; j < 3; j++) {
// //         grid[startRow + i][startCol + j] = numbers[idx++];
// //       }
// //     }
// //   }
  
// //   // Solve the partially filled grid
// //   const solved = solve(grid.map(row => [...row]));
// //   return solved ? solved : grid;
// // }

// // // FIXED: Create playable puzzle from completed grid
// // function createPuzzle() {
// //   const solvedPuzzle = getRandomSudoku();
// //   const puzzle = solvedPuzzle.map(row => [...row]);
  
// //   // Remove numbers (keep ~30% of cells)
// //   for (let i = 0; i < 9; i++) {
// //     for (let j = 0; j < 9; j++) {
// //       if (Math.random() > 0.3) puzzle[i][j] = 0;
// //     }
// //   }
// //   return puzzle;
// // }


import { SudokuUtil } from "./SudokuUtil.js";
import { Util } from "./Util.js";

// Optimized Solver Class
class OptimizedSolver {
  solve(grid) {
    // Create a working copy of the grid
    const workingGrid = grid.map(row => [...row]);
    const possibilities = Array(9).fill().map(() => 
      Array(9).fill().map(() => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]))
    );

    // Initialize constraints
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (workingGrid[r][c] !== 0) {
          this.applyConstraints(workingGrid, r, c, workingGrid[r][c], possibilities);
        }
      }
    }

    // Solve and return the solution grid
    return this.backtrack(workingGrid, possibilities);
  }

  applyConstraints(grid, row, col, value, possibilities) {
    for (let i = 0; i < 9; i++) {
      // Row constraints
      if (i !== col) this.removeCandidate(possibilities, row, i, value);
      // Column constraints
      if (i !== row) this.removeCandidate(possibilities, i, col, value);
      // Box constraints
      const boxRow = Math.floor(row/3)*3 + Math.floor(i/3);
      const boxCol = Math.floor(col/3)*3 + (i % 3);
      if (!(boxRow === row && boxCol === col)) {
        this.removeCandidate(possibilities, boxRow, boxCol, value);
      }
    }
  }

  removeCandidate(possibilities, row, col, value) {
    if (possibilities[row][col].has(value)) {
      possibilities[row][col].delete(value);
    }
  }

  backtrack(grid, possibilities) {
    // Find cell with fewest candidates
    let minCandidates = Infinity;
    let targetRow = -1, targetCol = -1;
    
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (grid[r][c] === 0 && possibilities[r][c].size < minCandidates) {
          minCandidates = possibilities[r][c].size;
          targetRow = r;
          targetCol = c;
        }
      }
    }

    // If no empty cells, return solution
    if (minCandidates === Infinity) return grid;
    
    const candidates = Array.from(possibilities[targetRow][targetCol]);
    for (const num of candidates) {
      // Create copies for backtracking
      const newGrid = grid.map(row => [...row]);
      const newPossibilities = possibilities.map(row => 
        row.map(cell => new Set(cell))
      );
      
      // Place candidate
      newGrid[targetRow][targetCol] = num;
      this.applyConstraints(newGrid, targetRow, targetCol, num, newPossibilities);
      
      // Recursive solve
      const result = this.backtrack(newGrid, newPossibilities);
      if (result) return result;
    }
    
    return null; // No solution found
  }
}

const optimizedSolver = new OptimizedSolver();

export class Sudoku {
  constructor(sudoku) {
    if (!sudoku) {
      this.sudoku = createPuzzle();
    } else {
      this.sudoku = sudoku;
    }
    this.solvedSudoku = [];
    this.isValidSudoku = false;
    this.isSolved = false;
  }

  get puzzle() {
    return this.sudoku;
  }

  get solvedPuzzle() {
    return this.solvedSudoku;
  }

  validate() {
    return isValidSolution(this.sudoku);
  }

  isSolvable() {
    this.isValidSudoku = isValidPuzzle(this.sudoku);
    if (this.isValidSudoku) {
      // Create a copy to solve
      const gridCopy = this.sudoku.map(row => [...row]);
      
      // Use optimized solver
      const solution = optimizedSolver.solve(gridCopy);
      
      if (solution) {
        // Store solution
        this.solvedSudoku = solution;
        return true;
      }
    }
    return false;
  }
}

// Rest of the code remains unchanged
function isValidPuzzle(grid) {
  if (SudokuUtil.isValidPuzzle(grid)) {
    return true;
  }
  return false;
}

function isValidSolution(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        return false;
      }
    }
  }
  return SudokuUtil.isValidPuzzle(grid);
}

function solve(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let possibleNumber = 1; possibleNumber <= 9; possibleNumber++) {
          if (SudokuUtil.isValidPlace(grid, row, col, possibleNumber)) {
            grid[row][col] = possibleNumber;
            if (solve(grid)) {
              return true;
            }
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function createPuzzle() {
  let puzzle = getRandomSudoku();
  let solution = solve(puzzle);
  if (solution) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (Math.random() > 0.3) puzzle[i][j] = 0;
      }
    }
  }
  return puzzle;
}

function getRandomSudoku() {
  const randomSudoku = [];
  for (let i = 0; i < 9; i++) {
    randomSudoku[i] = Array(9).fill(0);
  }
  for (let i = 0; i < 8; i++) {
    let number = Math.floor(Math.random() * 8) + 1;
    while (!SudokuUtil.isValidPlace(randomSudoku, 0, i, number)) {
      number = Math.floor(Math.random() * 8) + 1;
    }
    if (SudokuUtil.isValidPlace(randomSudoku, 0, i, number)) {
      randomSudoku[0][i] = number;
    }
  }
  return randomSudoku;
}
