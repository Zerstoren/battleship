import { EventEmitter } from 'events';
import React, { FC, useMemo, useState } from 'react';
import useLetters from '../../../../shared/hooks/letters';
import { ILobbyStore } from '../../../../stores/lobby';
import { FieldTable } from '../../styledComponents';
import Cell from './Cell';
import {
  matrixCheckCollision,
  matrixClearShadows,
  matrixCrossing,
  matrixRemoveChained,
  matrixSetErrShadow,
  matrixSetShadow,
  matrixSetShip,
} from './helperFn';
import { IMatrix } from './types';

interface IProp {
  shipRestore: (shipSize: number) => void,
  lobby: ILobbyStore,
  disabled: boolean,
  dataMatrix: IMatrix,
  setMatrix: React.Dispatch<React.SetStateAction<IMatrix>>
}

const TableField: FC<IProp> = (props: IProp) => {
  const {
    lobby, shipRestore, disabled, dataMatrix, setMatrix,
  } = props;
  const [emitter] = useState<EventEmitter>(new EventEmitter());
  const letters = useLetters();

  const theadTd: JSX.Element[] = [<td key="empty" />];

  const memoTr = useMemo(() => {
    let localDataMatrix = dataMatrix;

    const matrixCrossAndEmit = (newMatrix: IMatrix): boolean => {
      const matrixCrossData = matrixCrossing(localDataMatrix, newMatrix);

      if (matrixCrossData.length === 0) {
        return false;
      }

      matrixCrossData.forEach((data) => {
        emitter.emit(`${data.x}_${data.y}`, data.data);
      });

      setMatrix(newMatrix);
      localDataMatrix = newMatrix;

      return true;
    };

    const handleShipDrop = (x: number, y: number, shipSize: number) => {
      if (!matrixCheckCollision(localDataMatrix, x, y, shipSize)) {
        matrixCrossAndEmit(matrixClearShadows(localDataMatrix));
        return;
      }

      matrixCrossAndEmit(
        matrixSetShip(
          matrixClearShadows(localDataMatrix),
          x,
          y,
          shipSize,
        ),
      );
    };

    const handleShadowDrop = (x: number, y: number, shipSize: number) => {
      const fn = matrixCheckCollision(localDataMatrix, x, y, shipSize) ? matrixSetShadow : matrixSetErrShadow;
      matrixCrossAndEmit(
        fn(
          matrixClearShadows(localDataMatrix),
          x,
          y,
          shipSize,
        ),
      );
    };

    const handleRemove = (x: number, y: number) => {
      const [matrix, shipSize] = matrixRemoveChained(localDataMatrix, x, y);
      matrixCrossAndEmit(
        matrix,
      );
      shipRestore(shipSize);
    };

    const tr: JSX.Element[] = [];

    for (let y = 0; y < lobby.y; y++) {
      const td: JSX.Element[] = [<td key={`head-${y}`}>{y + 1}</td>];

      for (let x = 0; x < lobby.x; x++) {
        td.push(<Cell
          key={`${y}-${x}`}
          emitter={emitter}
          fill={dataMatrix[y][x]}
          x={x}
          y={y}
          disabled={disabled}
          onDropShip={handleShipDrop}
          onShadowShipDrop={handleShadowDrop}
          onRemoveFromField={handleRemove}
        />);
      }

      tr.push(<tr key={y}>{td}</tr>);
    }

    return tr;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lobby, disabled, emitter]);

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
          {memoTr}
        </tbody>
      </FieldTable>
    </>
  );
};

export default TableField;
