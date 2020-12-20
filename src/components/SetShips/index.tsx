import { inject, observer } from 'mobx-react';
import React, { FC } from 'react';
import { AppHeader } from '../../shared/StyledComponents/Headers';
import { ILobbyStore } from '../../stores/lobby';
import SelectShipsPosition from './Field/SelectShipsPosition';
import TableField from './Field/TableField';
import { IProps } from './types';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const SetShips: FC<IProps> = inject('mainStore')(observer((props) => {
  const mainStore = props.mainStore;
  const lobby = mainStore?.currentLobby;
  
  return (
    <>
      <AppHeader>Set ships</AppHeader>
      <div className="d-flex">
        <DndProvider backend={HTML5Backend}>
          <div>
            <TableField lobby={lobby as ILobbyStore} />
          </div>
          <SelectShipsPosition lobby={lobby as ILobbyStore} />
        </DndProvider>
      </div>
    </>
  );
}));


export default SetShips;
