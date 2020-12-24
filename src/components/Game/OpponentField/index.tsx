import React, { FC } from 'react';
import useLetters from '../../../shared/hooks/letters';
import { ILobbyStore } from '../../../stores/lobby';
import { IMatrix, MatrixFill } from '../../SetShips/Field/TableField/types';

interface IProps {
  lobby: ILobbyStore,
  matrix: IMatrix,
  handleFire: null | ((data: {x: number, y: number}) => void)
}

const OpponentField: FC<IProps> = (props: IProps) => {
  const { lobby, handleFire, matrix } = props;

  const letters = useLetters();

  const handleClick = (x: number, y: number) => {
    if (handleFire) handleFire({ x, y });
  };

  const tr: JSX.Element[] = [];
  const theadTd: JSX.Element[] = [<td key="empty" />];

  for (let y = 0; y < lobby.y; y++) {
    const td: JSX.Element[] = [<td key={`head-${y}`}>{y + 1}</td>];

    for (let x = 0; x < lobby.x; x++) {
      let classNames = '';
      if (handleFire && matrix[y][x] === MatrixFill.EMPTY) {
        classNames += ' fire';
      } else if (matrix[y][x] === MatrixFill.MISS) {
        classNames += ' miss';
      } else if (matrix[y][x] === MatrixFill.SET_KILL) {
        classNames += ' hit';
      }

      td.push(<td
        className={classNames}
        onClick={() => handleClick(x, y)}
        key={`${y}-${x}`}
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

export default OpponentField;
