import { types } from "mobx-state-tree";
import lobbyStore from "./lobby";
import { GameStatus } from "../components/App/types";
import { ILobbyStore } from "./types";

const MainStore = types.model({
  status: types.enumeration<GameStatus>('GameStatus', [
    GameStatus.MAIN,
    GameStatus.CREATE_LOBBY,
    GameStatus.LOBBY_LIST,
    GameStatus.SET_SHIPS,
    GameStatus.GAME,
    GameStatus.GAMEOVER
  ]),
  currentLobby: types.union(types.null, types.late(() => lobbyStore)),
}).actions(self => ({
  setGameStatus(gameStatus: GameStatus) {
    self.status = gameStatus;
  },
  setLobby(gameStatus: GameStatus, lobby: ILobbyStore) {
    self.status = gameStatus;
    self.currentLobby = lobby;
  }
}));

export {
  MainStore
};

export default MainStore.create({
  status: GameStatus.MAIN,
  currentLobby: null,
});