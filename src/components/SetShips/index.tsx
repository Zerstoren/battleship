import { inject, observer, useLocalObservable } from 'mobx-react';
import React, { FC } from 'react';
import { sendReady } from '../../API/pairMessage';
import { AppHeader } from '../../shared/StyledComponents/Headers';
import { ILobbyStore } from '../../stores/lobby';
import SelectShipsPosition from './Field/SelectShipsPosition';
import TableField from './Field/TableField';
import { ButtonReady, ButtonReadyBlock } from './styledComponents';
import { IProps } from './types';

const SetShips: FC<IProps> = inject('mainStore')(observer((props) => {
  const mainStore = props.mainStore;
  const lobby = mainStore?.currentLobby;
  
  const state = useLocalObservable(() => ({
    ships4n: lobby?.ships4n,
    ships3n: lobby?.ships3n,
    ships2n: lobby?.ships2n,
    ships1n: lobby?.ships1n,
    isReady: false,

    decraseShip(shipSize: number) {
      //@ts-ignore
      state[`ships${shipSize}n`] = state[`ships${shipSize}n`] - 1;
    },

    increseShip(shipSize: number) {
      //@ts-ignore
      state[`ships${shipSize}n`] = state[`ships${shipSize}n`] + 1;
    },

    setReady() {
      state.isReady = true;
    }
  }));

  const handleReady = () => {
    state.setReady();
    sendReady();
  }

  let buttonReady = null;

  if (state.ships4n === 0 && state.ships3n === 0 && state.ships2n === 0 && state.ships1n === 0) {
    buttonReady = <ButtonReady onClick={handleReady} disabled={state.isReady}>Ready</ButtonReady>;
  }

  return (
    <>
      <AppHeader>Set ships</AppHeader>
      <div className="d-flex">
        <div>
          <TableField lobby={lobby as ILobbyStore} shipRestore={state.increseShip} disabled={state.isReady} />
        </div>
        <SelectShipsPosition state={state}>
          <ButtonReadyBlock>
            {buttonReady}
          </ButtonReadyBlock>
        </SelectShipsPosition>
      </div>
    </>
  );
}));


export default SetShips;
