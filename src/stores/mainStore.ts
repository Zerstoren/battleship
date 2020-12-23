import { getSnapshot, Instance, types } from "mobx-state-tree";
import { GameStatus } from "../components/App/types";
import { IMatrix, MatrixFill } from "../components/SetShips/Field/TableField/types";
import { ILobbyStore, lobbyIndexes } from "./lobby";

const LobbyElement = types.model("MainStore_LobyElement", lobbyIndexes);

const MainStore = types.model("MainStore", {
  status: types.enumeration<GameStatus>('GameStatus', [
    GameStatus.MAIN,
    GameStatus.CREATE_LOBBY,
    GameStatus.LOBBY_LIST,
    GameStatus.WAIT_CONNECT,
    GameStatus.SET_SHIPS,
    GameStatus.GAME,
    GameStatus.GAMEOVER
  ]),
  currentLobby: types.maybeNull(LobbyElement),
  gameMatrix: types.maybeNull(types.array(types.array(types.enumeration<MatrixFill>([MatrixFill.EMPTY, MatrixFill.SET])))),
  error: types.optional(types.string, ''),
}).actions(self => ({
  setGameStatus(gameStatus: GameStatus) {
    self.status = gameStatus;
  },
  setLobby(gameStatus: GameStatus, lobby: ILobbyStore | null) {
    self.status = gameStatus;
    if (lobby === null) {
      self.currentLobby = null;
    } else {
      self.currentLobby = getSnapshot(lobby);
    }
  },
  setGameMatrix(matrix: IMatrix) {
    //@ts-ignore
    self.gameMatrix = matrix;
    self.status = GameStatus.GAME;
  },
  setError(message: string) {
    self.error = message;
    self.status = GameStatus.MAIN
  }
}));

export interface IMainStore extends Instance<typeof MainStore>{};

export {
  MainStore
};

const mainStore = MainStore.create({
  status: GameStatus.MAIN,
  currentLobby: null
});

export default mainStore;