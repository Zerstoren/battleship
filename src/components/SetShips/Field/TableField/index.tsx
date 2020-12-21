import React, { FC, useState } from 'react';
import { ILobbyStore } from '../../../../stores/lobby';
import { FieldTable } from '../../styledComponents';
import Cell from './Cell';
import { matrix, matrixCheckCollision, matrixClearShadows, matrixRemoveChained, matrixSetErrShadow, matrixSetShadow, matrixSetShip } from './helperFn';
import { IMatrix } from './types';

interface IProp {
  lobby: ILobbyStore
}

const letters: string[] = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
  'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
  'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'X', 'Z'
];

const TableField: FC<IProp> = (props) => {
  const lobby = props.lobby;
  const [dataMatrix, setMatrix] = useState<IMatrix>(matrix(lobby.x, lobby.y));
  const [[lastX, lastY], setPositions] = useState<[number, number]>([-1, -1]);

  const handleShipDrop = (x: number, y: number, shipSize: number) => {
    if (!matrixCheckCollision(dataMatrix, x, y, shipSize)) {
      setMatrix(matrixClearShadows(dataMatrix));
      return;
    }

    setMatrix(
      matrixSetShip(
        matrixClearShadows(dataMatrix),
        x,
        y,
        shipSize
      )
    );
  }

  const handleShadowDrop = (x: number, y: number, shipSize: number) => {
    if (x === lastX && y === lastY) {
      return;
    }

    setPositions([x, y]);
    const fn = matrixCheckCollision(dataMatrix, x, y, shipSize) ? matrixSetShadow : matrixSetErrShadow;
    setMatrix(
      fn(
        matrixClearShadows(dataMatrix),
        x,
        y,
        shipSize
      )
    );
  }

  const handleRemove = (x: number, y: number) => {
    setMatrix(
      matrixRemoveChained(dataMatrix, x, y)
    );
  }

  let tr: JSX.Element[] = [];
  let theadTd: JSX.Element[] = [<td key="empty"></td>];

  for (let y = 0; y < lobby.y; y++) {
    let td: JSX.Element[] = [<td key={`head-${y}`}>{y+1}</td>];

    for (let x = 0; x < lobby.x; x++) {
      td.push(<Cell 
        key={`${y}-${x}`} 
        fill={dataMatrix[y][x]}
        x={x} 
        y={y} 
        onDropShip={handleShipDrop} 
        onShadowShipDrop={handleShadowDrop}
        onRemoveFromField={handleRemove}
      />);
    }

    tr.push(<tr key={y}>{td}</tr>);
  }

  for (let x = 0; x < lobby.x; x++) {
    theadTd.push(<td key={`head-${x}`}>{letters[x]}</td>);
  }
  
  return (
    <>
      <FieldTable sizeX={lobby.x} sizeY={lobby.y}>
        <thead>
          <tr>
            {theadTd}
          </tr>
        </thead>
        <tbody>
          {tr}
        </tbody>
      </FieldTable>
    </>
  );
};

export default TableField;
