import { getSnapshot, Instance, types } from "mobx-state-tree";
import { GameStatus } from "../components/App/types";
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
  error: types.optional(types.string, ''),
}).actions(self => ({
  setGameStatus(gameStatus: GameStatus) {
    self.status = gameStatus;
  },
  setLobby(gameStatus: GameStatus, lobby: ILobbyStore) {
    self.status = gameStatus;
    self.currentLobby = getSnapshot(lobby);
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

export default MainStore.create({
  status: GameStatus.MAIN,
  currentLobby: null
});