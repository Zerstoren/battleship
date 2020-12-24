import { inject, observer, useLocalObservable } from 'mobx-react';
import React, { FC, useState } from 'react';
import { sendReady } from '../../API/pairMessage';
import useWebsocket from '../../shared/hooks/websocket';
import { AppHeader } from '../../shared/StyledComponents/Headers';
import { ILobbyStore } from '../../stores/lobby';
import SelectShipsPosition from './Field/SelectShipsPosition';
import TableField from './Field/TableField';
import { matrix } from './Field/TableField/helperFn';
import { IMatrix } from './Field/TableField/types';
import { ButtonReady, ButtonReadyBlock } from './styledComponents';
import { IProps } from './types';

const SetShips: FC<IProps> = inject('mainStore')(observer((props) => {
  const mainStore = props.mainStore;
  const lobby = mainStore?.currentLobby;
  
  const [dataMatrix, setMatrix] = useState<IMatrix>(matrix(lobby?.x as number, lobby?.y as number));
  
  const state = useLocalObservable(() => ({
    ships4n: lobby?.ships4n,
    ships3n: lobby?.ships3n,
    ships2n: lobby?.ships2n,
    ships1n: lobby?.ships1n,
    isReady: false,
    opponentReady: false,

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
    },

    setOpponentReady() {
      state.opponentReady = true;
    }
  }));

  useWebsocket('ready', (data) => {
    state.setOpponentReady();

    if (state.isReady && state.opponentReady) {
      mainStore?.setGameMatrix(dataMatrix);
    }
  });

  const handleReady = () => {
    state.setReady();
    sendReady();

    if (state.isReady && state.opponentReady) {
      mainStore?.setGameMatrix(dataMatrix);
    }
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
          <TableField 
            lobby={lobby as ILobbyStore} 
            shipRestore={state.increseShip} 
            disabled={state.isReady} 
            dataMatrix={dataMatrix}
            setMatrix={setMatrix}  
          />
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
