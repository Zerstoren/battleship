import { DragObjectWithType } from "react-dnd/lib/interfaces/hooksApi";

export enum MatrixFill {
  EMPTY = '',
  SHADOW = 's',
  ERR_SHADOW = 'e',
  SET = 'w',
  SET_KILL = 'k',
  MISS = 'm',
}

export interface IMatrix extends Array<Array<MatrixFill>> {}

export interface DragObjectItem extends DragObjectWithType {
  size: number
}