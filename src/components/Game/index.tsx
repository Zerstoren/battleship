import { inject, observer } from 'mobx-react';
import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import useWebsocketOpponent from '../../shared/hooks/websocketOpponent';
import { AppHeader } from '../../shared/StyledComponents/Headers';
import { ILobbyStore } from '../../stores/lobby';
import { FireTurn, GameStatus } from '../App/types';
import {
  matrix, matrixCountElements, matrixSetKillByPosition, matrixSetMissByPosition,
} from '../SetShips/Field/TableField/helperFn';
import { IMatrix, MatrixFill } from '../SetShips/Field/TableField/types';
import MyField from './MyField';
import OpponentField from './OpponentField';
import { FlexGameField, MyGameField, OpponentGameField } from './styledComponents';
import { IProps } from './types';

const Game: FC<IProps> = inject('mainStore')(observer((props) => {
  const { mainStore } = props;
  const lobby = mainStore?.currentLobby as ILobbyStore;
  const [dataMyMatrix, setMyMatrix] = useState<IMatrix>(mainStore?.gameMatrix as IMatrix);
  const [dataOpponentMatrix, setOpponentMatrix] = useState<IMatrix>(matrix(lobby.x, lobby.y));
  const randInt = useRef(Math.random());

  const selectWhoFirst = useWebsocketOpponent(
    'selectWhoFirst',
    (data: {rand: number}) => mainStore?.setFireTurn(data.rand > randInt.current ? FireTurn.OPPONENT : FireTurn.ME),
  );

  const gameComplete = useWebsocketOpponent('gameComplete', (data: {game: string}) => {
    if (data.game === 'you_win') {
      mainStore?.setGameStatus(GameStatus.GAMEWIN);
    }
  });

  const hitResolve = useWebsocketOpponent('hitResolve', (data: {x: number, y: number, hit: boolean}) => {
    const { hit, x, y } = data;

    if (!hit) {
      mainStore?.setFireTurn(FireTurn.OPPONENT);
      setOpponentMatrix(matrixSetMissByPosition(dataOpponentMatrix, x, y));
    } else {
      setOpponentMatrix(matrixSetKillByPosition(dataOpponentMatrix, x, y));
    }
  });

  const fire = useWebsocketOpponent('fireToPosition', (data: {x: number, y: number}) => {
    const [x, y] = [data.x, data.y];

    hitResolve({
      hit: dataMyMatrix[y][x] === MatrixFill.SET,
      x,
      y,
    });

    if (dataMyMatrix[y][x] !== MatrixFill.SET) {
      mainStore?.setFireTurn(FireTurn.ME);
      setMyMatrix(
        matrixSetMissByPosition(dataMyMatrix, x, y),
      );
    } else {
      const newMatrix = matrixSetKillByPosition(dataMyMatrix, x, y);
      setMyMatrix(newMatrix);

      if (matrixCountElements(newMatrix, MatrixFill.SET) === 0) {
        gameComplete({ game: 'you_win' });
        mainStore?.setGameStatus(GameStatus.GAMEOVER);
      }
    }
  });

  useEffect(() => {
    if (mainStore?.fireTurn === FireTurn.NOBODY) {
      selectWhoFirst({
        rand: randInt.current,
      });
    }
  }, [randInt, mainStore?.fireTurn, selectWhoFirst]);

  return (
    <>
      <AppHeader>Fight</AppHeader>
      <FlexGameField>
        <OpponentGameField sizeX={lobby.x} sizeY={lobby.y}>
          <OpponentField
            lobby={lobby}
            matrix={dataOpponentMatrix}
            handleFire={mainStore?.fireTurn === FireTurn.ME ? fire : null}
          />
        </OpponentGameField>

        <MyGameField sizeX={lobby.x} sizeY={lobby.y}>
          <MyField lobby={lobby} matrix={dataMyMatrix} />
        </MyGameField>
      </FlexGameField>
    </>
  );
}));

export default Game;
