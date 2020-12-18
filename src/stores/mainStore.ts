import { types } from "mobx-state-tree";
import lobbyStore from "./lobby";
import { GameStatus } from "../components/App/types";
import { ILobbyStore } from "./types";

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
  currentLobby: types.union(types.null, types.reference(types.late(() => lobbyStore))),
  error: types.optional(types.string, ''),
}).actions(self => ({
  setGameStatus(gameStatus: GameStatus) {
    self.status = gameStatus;
  },
  setLobby(gameStatus: GameStatus, lobby: ILobbyStore) {
    self.status = gameStatus;
    self.currentLobby = lobby;
  },
  setError(message: string) {
    self.error = message;
    self.status = GameStatus.MAIN
  }
}));

export {
  MainStore
};

export default MainStore.create({
  status: GameStatus.MAIN,
  currentLobby: null,
});