import { inject, observer, useLocalObservable } from 'mobx-react';
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
  
  const state = useLocalObservable(() => ({
    ships4n: lobby?.ships4n,
    ships3n: lobby?.ships3n,
    ships2n: lobby?.ships2n,
    ships1n: lobby?.ships1n,

    decraseShip(shipSize: number) {
      //@ts-ignore
      state[`ships${shipSize}n`] = state[`ships${shipSize}n`] - 1;
    },

    increseShip(shipSize: number) {
      //@ts-ignore
      state[`ships${shipSize}n`] = state[`ships${shipSize}n`] + 1;
    },
  }));

  let buttonReady = null;

  if (state.ships4n === 0 && state.ships3n === 0 && state.ships2n === 0 && state.ships1n === 0) {
    buttonReady = <button>Ready</button>;
  }

  return (
    <>
      <AppHeader>Set ships</AppHeader>
      <div className="d-flex">
        <DndProvider backend={HTML5Backend}>
          <div>
            <TableField lobby={lobby as ILobbyStore} shipRestore={state.increseShip} />
          </div>
          <SelectShipsPosition state={state} />
        </DndProvider>
      </div>
      {buttonReady}
    </>
  );
}));


export default SetShips;
