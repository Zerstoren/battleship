import { IMatrix, MatrixFill } from "./types";

export const matrix = (x: number, y: number) : IMatrix => {
  const matrix: Array<Array<MatrixFill>> = [];
  
  for (let dy = 0; dy < y; dy++) {
    let matrixRow: Array<MatrixFill> = [];
    for (let dx = 0; dx < x; dx++) {
      matrixRow.push(MatrixFill.EMPTY);
    }

    matrix.push(matrixRow);
  }

  return matrix;
}

export const matrixClearShadows = (matrix: IMatrix) : IMatrix =>
  matrix.map((y) => y.map((x) => x === MatrixFill.SHADOW || x === MatrixFill.ERR_SHADOW ? MatrixFill.EMPTY : x));

const matrixSetFill = (matrix: IMatrix, x: number, y: number, shipSize: number, fill: MatrixFill) => {
  let dy = -1;

  return matrix.map(yLine => {
    dy += 1;
    let dx = -1;

    return yLine.map(xLine => {
      dx += 1;

      if ((dx >= x && dx <= x + shipSize - 1) && dy === y && xLine === MatrixFill.EMPTY) {
        return fill;
      }

      return xLine;
    });
  });
}

export const matrixPointExists = (matrix: IMatrix, x: number, y: number) : boolean =>
  matrix[y] ? matrix[y][x] !== undefined : false

export const matrixRemoveChained = (matrix: IMatrix, x: number, y: number) : [IMatrix, number] => {
  const matr = matrix.map(yLine => [...yLine]);
  let shipSize = 1;

  matr[y][x] = MatrixFill.EMPTY;

  let processMinus = true;
  let processPlus = true;

  for(let dx = 1; dx < 4; dx++) {
    if (!matrixPointExists(matr, x-dx, y) || matr[y][x-dx] === MatrixFill.EMPTY) processMinus = false;
    if (!matrixPointExists(matr, x+dx, y) || matr[y][x+dx] === MatrixFill.EMPTY) processPlus = false;

    if (processMinus) {
      shipSize += matr[y][x-dx] === MatrixFill.SET ? 1 : 0;
      matr[y][x-dx] = MatrixFill.EMPTY;
    }
    if (processPlus) {
      shipSize += matr[y][x+dx] === MatrixFill.SET ? 1 : 0;
      matr[y][x+dx] = MatrixFill.EMPTY;
    }
  }

  processMinus = true;
  processPlus = true;
  for(let dy = 1; dy < 4; dy++) {
    if (!matrixPointExists(matr, x, y-dy) || matr[y-dy][x] === MatrixFill.EMPTY) processMinus = false;
    if (!matrixPointExists(matr, x, y+dy) || matr[y+dy][x] === MatrixFill.EMPTY) processPlus = false;

    if (processMinus) {
      shipSize += matr[y-dy][x] === MatrixFill.SET ? 1 : 0;
      matr[y-dy][x] = MatrixFill.EMPTY;
    }
    if (processPlus) {
      shipSize += matr[y+dy][x] === MatrixFill.SET ? 1 : 0;
      matr[y+dy][x] = MatrixFill.EMPTY;
    }
  }

  return [matr, shipSize];
}

export const matrixCheckCollision = (matrix: IMatrix, x: number, y: number, shipSize: number) : boolean => {
  const collisionMap: Array<[number, number]> = [];
  
  if (matrixPointExists(matrix, x, y) && matrix[y][x] === MatrixFill.SET) {
    return false;
  }

  collisionMap.push([x - 1, y]);
  collisionMap.push([x + shipSize, y]);

  for (let dx = x - 1; dx < x + shipSize + 1; dx++) {
    collisionMap.push([dx, y - 1]);
    collisionMap.push([dx, y + 1]);
  }
  
  return collisionMap.every(([x, y]) => !matrixPointExists(matrix, x, y) || matrix[y][x] !== MatrixFill.SET);
}

export const matrixSetShadow = (matrix: IMatrix, x: number, y: number, shipSize: number) : IMatrix => 
  matrixSetFill(matrix, x, y, shipSize, MatrixFill.SHADOW);

export const matrixSetErrShadow = (matrix: IMatrix, x: number, y: number, shipSize: number) : IMatrix => 
  matrixSetFill(matrix, x, y, shipSize, MatrixFill.ERR_SHADOW);

export const matrixSetShip = (matrix: IMatrix, x: number, y: number, shipSize: number) : IMatrix => 
  matrixSetFill(matrix, x, y, shipSize, MatrixFill.SET);
