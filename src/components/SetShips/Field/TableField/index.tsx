import React, { FC, useState } from 'react';
import { ILobbyStore } from '../../../../stores/lobby';
import { FieldTable } from '../../styledComponents';
import Cell from './Cell';
import { matrix, matrixClearShadows, matrixSetShadow } from './helperFn';
import { IMatrix } from './types';

interface IProp {
  lobby: ILobbyStore
}

const letters: string[] = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
  'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
  'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Z'
];

const TableField: FC<IProp> = (props) => {
  const lobby = props.lobby;
  const [dataMatrix, setMatrix] = useState<IMatrix>(matrix(lobby.x, lobby.y));

  const handleShipDrop = () => {

  }

  const handleShadowDrop = (x: number, y: number, shipSize: number) => {
    setMatrix(
      matrixSetShadow(
        matrixClearShadows(dataMatrix),
        x,
        y,
        shipSize
      )
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
