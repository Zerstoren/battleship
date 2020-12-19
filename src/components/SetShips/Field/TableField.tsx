import React, { FC } from 'react';
import { AppHeader } from '../../../shared/StyledComponents/Headers';
import { FieldTable } from '../styledComponents';

interface IProp {
  lobby: any
}

const letters: string[] = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
  'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
  'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Z'
];

const TableField: FC<IProp> = (props) => {
  const lobby = props.lobby;

  let tr: JSX.Element[] = [];
  let theadTd: JSX.Element[] = [<td key="empty"></td>];

  for (let y = 0; y < lobby.y; y++) {
    let td: JSX.Element[] = [<td key={`head-${y}`}>{y+1}</td>];

    for (let x = 0; x < lobby.x; x++) {
      td.push(<td key={`${y}-${x}`}></td>);
    }

    tr.push(<tr key={y}>{td}</tr>);
  }

  for (let x = 0; x < lobby.x; x++) {
    theadTd.push(<td key={`head-${x}`}>{letters[x]}</td>);
  }
  
  return (
    <>
      <AppHeader>Set ships</AppHeader>

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
