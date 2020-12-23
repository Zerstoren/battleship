import { useRef, useState } from "react";
import { matrix } from "../../components/SetShips/Field/TableField/helperFn";
import { IMatrix } from "../../components/SetShips/Field/TableField/types";

const useMatrix = (sizeX: number, sizeY: number) => {
  const memoData = useRef(matrix(sizeX, sizeY));
  return useState<IMatrix>(memoData.current);
}

export default useMatrix;
