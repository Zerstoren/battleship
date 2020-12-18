import React, { FC } from "react";
import { AppHeader } from "../../shared/StyledComponents/Headers";
import { GameStatus, IProps } from "../App/types";
import { ButtonSearchUser } from "./styledComponents";

const Main: FC<IProps> = ({handleChangeGameStatus: handleStartGame}) => {
  return (
    <>
      <AppHeader>Battleship</AppHeader>
      <div>
        <ButtonSearchUser onClick={() => handleStartGame(GameStatus.LOBBY_LIST)}>
          Search opponent
        </ButtonSearchUser>

        <ButtonSearchUser onClick={() => handleStartGame(GameStatus.CREATE_LOBBY)}>
          Create lobby
        </ButtonSearchUser>
      </div>
    </>
  );
}

export default Main;