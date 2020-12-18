import { ILobbyStore, IMainStore } from "../../stores/types";

export enum GameStatus {
  MAIN = 'main',
  LOBBY_LIST = 'list',
  CREATE_LOBBY = 'create',
  WAIT_CONNECT = 'wait',
  SET_SHIPS = 'set_ships',
  GAME = 'game_process',
  GAMEOVER = 'game_end',
}

export interface IGameState {
  gameStatus: GameStatus,
  gameWithUser: boolean,

  setGameStatus: (status: GameStatus) => void,
}

export interface IAppProps {
  mainStore?: IMainStore
}

export interface IProps {
  handleChangeGameStatus: (startGame: GameStatus) => void,
}

export interface ISetLobbyProps {
  handleSetLobby: (startGame: GameStatus, lobby: ILobbyStore) => void
}