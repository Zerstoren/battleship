import { inject, observer, useLocalObservable } from 'mobx-react';
import React, { FC, useState } from 'react';
import useWebsocketOpponent from '../../shared/hooks/websocketOpponent';
import { AppHeader } from '../../shared/StyledComponents/Headers';
import { ILobbyStore } from '../../stores/lobby';
import SelectShipsPosition from './Field/SelectShipsPosition';
import TableField from './Field/TableField';
import { matrix } from './Field/TableField/helperFn';
import { IMatrix } from './Field/TableField/types';
import { ButtonReady, ButtonReadyBlock } from './styledComponents';
import { IProps } from './types';

const SetShips: FC<IProps> = inject('mainStore')(observer((props: IProps) => {
  const { mainStore } = props;
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
      // @ts-expect-error: TS can associate state with dynamic object
      state[`ships${shipSize}n`] = state[`ships${shipSize}n`] - 1;
    },

    increseShip(shipSize: number) {
      // @ts-expect-error: TS can associate state with dynamic object
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state[`ships${shipSize}n`] = state[`ships${shipSize}n`] + 1;
    },

    setReady() {
      state.isReady = true;
    },

    setOpponentReady() {
      state.opponentReady = true;
    },
  }));

  const sendReady = useWebsocketOpponent('ready', () => {
    state.setOpponentReady();

    if (state.isReady && state.opponentReady) {
      mainStore?.setGameMatrix(dataMatrix);
    }
  });

  const handleReady = () => {
    state.setReady();
    sendReady({});

    if (state.isReady && state.opponentReady) {
      mainStore?.setGameMatrix(dataMatrix);
    }
  };

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
            shipRestore={(n: number) => state.increseShip(n)}
            disabled={state.isReady}
            dataMatrix={dataMatrix}
            setMatrix={setMatrix}
          />
        </div>
        <SelectShipsPosition
          ships4n={state.ships4n as number}
          ships3n={state.ships3n as number}
          ships2n={state.ships2n as number}
          ships1n={state.ships1n as number}
          decraseShip={(n: number) => state.decraseShip(n)}
        >
          <ButtonReadyBlock>
            {buttonReady}
          </ButtonReadyBlock>
        </SelectShipsPosition>
      </div>
    </>
  );
}));

export default SetShips;
