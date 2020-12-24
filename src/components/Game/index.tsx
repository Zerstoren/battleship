import { inject, observer } from "mobx-react";
import React, { FC, useEffect, useRef, useState } from "react";
import useWebsocket from "../../shared/hooks/websocket";
import { AppHeader } from "../../shared/StyledComponents/Headers";
import { ILobbyStore } from "../../stores/lobby";
import { FireTurn, GameStatus } from "../App/types";
import { matrix, matrixCountElements, matrixSetKillByPosition, matrixSetMissByPosition } from "../SetShips/Field/TableField/helperFn";
import { IMatrix, MatrixFill } from "../SetShips/Field/TableField/types";
import MyField from "./MyField";
import OpponentField from "./OpponentField";
import { FlexGameField, MyGameField, OpponentGameField } from "./styledComponents";
import { IProps } from "./types";

const Game: FC<IProps> = inject('mainStore')(observer((props) => {
  const {mainStore} = props;
  const lobby = mainStore?.currentLobby as ILobbyStore;
  const [dataMyMatrix, setMyMatrix] = useState<IMatrix>(mainStore?.gameMatrix as IMatrix);
  const [dataOpponentMatrix, setOpponentMatrix] = useState<IMatrix>(matrix(lobby.x, lobby.y));
  const randInt = useRef(Math.random());

  const selectWhoFirst = useWebsocket(
    'selectWhoFirst', 
    (data) => mainStore?.setFireTurn(data['rand'] > randInt.current ? FireTurn.OPPONENT : FireTurn.ME)
  );

  const gameComplete = useWebsocket('gameComplete', (data) => {
    if (data['game'] === 'you_win') {
      mainStore?.setGameStatus(GameStatus.GAMEWIN);
    }
  });

  const hitResolve = useWebsocket('hitResolve', (data) => {
    const hit = data.hit;
    const [x, y] = [
      Number.parseInt(data['x']),
      Number.parseInt(data['y']),
    ];

    if (!hit) {
      mainStore?.setFireTurn(FireTurn.OPPONENT);
      setOpponentMatrix(matrixSetMissByPosition(dataOpponentMatrix, x, y));
    } else {
      setOpponentMatrix(matrixSetKillByPosition(dataOpponentMatrix, x, y));
    }
  });

  const fire = useWebsocket('fireToPosition', (data) => {
    const [x, y] = [
      Number.parseInt(data['x']),
      Number.parseInt(data['y']),
    ];

    hitResolve({
      hit: dataMyMatrix[y][x] === MatrixFill.SET,
      x: x,
      y: y,
    });

    if (dataMyMatrix[y][x] !== MatrixFill.SET) {
      mainStore?.setFireTurn(FireTurn.ME);
      setMyMatrix(
        matrixSetMissByPosition(dataMyMatrix, x, y)
      );
    } else {
      const newMatrix = matrixSetKillByPosition(dataMyMatrix, x, y);
      setMyMatrix(newMatrix);
      
      if (matrixCountElements(newMatrix, MatrixFill.SET) === 0) {
        gameComplete({game: 'you_win'});
        mainStore?.setGameStatus(GameStatus.GAMEOVER);
      }
    }
  });

  useEffect(() => {
    if (mainStore?.fireTurn === FireTurn.NOBODY) {
      selectWhoFirst({
        rand: randInt.current
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