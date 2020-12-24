import { FC } from "react";
import useLetters from "../../../shared/hooks/letters";
import { ILobbyStore } from "../../../stores/lobby";
import { IMatrix, MatrixFill } from "../../SetShips/Field/TableField/types";

interface IProps {
  lobby: ILobbyStore,
  matrix: IMatrix,
  handleFire: null | ((data: any) => void)
}

const OpponentField: FC<IProps> = (props) => {
  const {lobby, handleFire, matrix} = props;

  const letters = useLetters();

  const handleClick = (x: number, y: number) => {
    handleFire && handleFire({x: x, y: y});
  }

  let tr: JSX.Element[] = [];
  let theadTd: JSX.Element[] = [<td key="empty"></td>];

  for (let y = 0; y < lobby.y; y++) {
    let td: JSX.Element[] = [<td key={`head-${y}`}>{y+1}</td>];

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
      ></td>);
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
}

export default OpponentField;
