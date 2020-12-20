import { DragObjectWithType } from "react-dnd/lib/interfaces/hooksApi";

export enum MatrixFill {
  EMPTY = '',
  SHADOW = 's',
  SET = 's',
}

export interface IMatrix extends Array<Array<MatrixFill>> {}

export interface DragObjectItem extends DragObjectWithType {
  size: number
}