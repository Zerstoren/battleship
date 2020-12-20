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
  matrix.map((y) => y.map((x) => x === MatrixFill.SHADOW ? MatrixFill.EMPTY : x));

export const matrixSetShadow = (matrix: IMatrix, x: number, y: number, shipSize: number) : IMatrix => {
  let dy = -1;

  return matrix.map(yLine => {
    dy += 1;
    let dx = -1;

    return yLine.map(xLine => {
      dx += 1;

      if ((dx >= x && dx <= x + shipSize - 1) && dy === y) {
        return MatrixFill.SHADOW;
      }

      return xLine;
    });
  });
}
