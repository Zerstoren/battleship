import React, { FC } from 'react';
import useLetters from '../../../shared/hooks/letters';
import { ILobbyStore } from '../../../stores/lobby';
import { IMatrix, MatrixFill } from '../../SetShips/Field/TableField/types';

interface IProps {
  lobby: ILobbyStore,
  matrix: IMatrix
}

const MyField: FC<IProps> = (props: IProps) => {
  const { lobby, matrix } = props;

  const letters = useLetters();

  const tr: JSX.Element[] = [];
  const theadTd: JSX.Element[] = [<td key="empty" />];

  for (let y = 0; y < lobby.y; y++) {
    const td: JSX.Element[] = [<td key={`head-${y}`}>{y + 1}</td>];

    for (let x = 0; x < lobby.x; x++) {
      let classNames = '';

      if (matrix[y][x] === MatrixFill.MISS) {
        classNames += ' miss';
      } else if (matrix[y][x] === MatrixFill.SET_KILL) {
        classNames += ' hit';
      }

      td.push(<td
        key={`${y}-${x}`}
        className={(matrix[y][x] === 'w' ? 'ship-set' : '') + classNames}
      />);
    }

    tr.push(<tr key={y}>{td}</tr>);
  }

  for (let x = 0; x < lobby.x; x++) {
    theadTd.push(<td key={`head-${x}`}>{letters[x]}</td>);
  }

  return (
    <>
      <thead>
        <tr>
          {theadTd}
        </tr>
      </thead>
      <tbody>
        {tr}
      </tbody>
    </>
  );
};

export default MyField;
