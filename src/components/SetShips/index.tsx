import React, { FC } from 'react';
import { inject, observer } from 'mobx-react';
import { IProps } from './types';
import { AppHeader } from '../../shared/StyledComponents/Headers';
import { FieldTable } from './styledComponents';
import { ILobbyStore } from '../../stores/lobby';

const SetShips: FC<IProps> = inject('mainStore')(observer((props) => {
  const mainStore = props.mainStore;
  const lobby = mainStore?.currentLobby as ILobbyStore;

  if (lobby === null) {
    return null;
  }
  
  let tr: JSX.Element[] = [];

  for (let y = 0; y < lobby!.y; y++) {
    let td: JSX.Element[] = [];

    for (let x = 0; x < lobby!.x; x++) {
      td.push(<td key={`${y}-${x}`}></td>);
    }

    tr.push(<tr key={y}>{td}</tr>);
  } 

  return (
    <>
      <AppHeader>Set ships</AppHeader>

      <FieldTable>
        <tbody>
          {tr}
        </tbody>
      </FieldTable>
    </>
  );
}));


export default SetShips;
