import { getSnapshot, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { connectLobby, pubLobby } from "../API/lobby";
import { IDataFromServer } from "../components/LobbyList/types";

export const lobbyIndexes = {
  lobbyName: types.identifier,
  x: types.optional(types.number, 10),
  y: types.optional(types.number, 10),
  ships4n: types.optional(types.number, 1),
  ships3n: types.optional(types.number, 2),
  ships2n: types.optional(types.number, 3),
  ships1n: types.optional(types.number, 4),
};

const LobbyStore = types.model('Lobby', lobbyIndexes).actions(self => {
  return {
    publishLobby() {
      pubLobby(getSnapshot(self));
    },

    connectToLobby(userId: string) {
      connectLobby(userId);
    }
  }
});

const LobbyElementsStores = types.model("LobbyElements", {
  lobbys: types.array(LobbyStore)
}).actions(self => ({
  addItems(data: IDataFromServer) {
    self.lobbys.concat(Object.values(data))
  }
}));

export const lobbyElementsStores = LobbyElementsStores.create();


export interface ILobbyStore extends Instance<typeof LobbyStore>{}
export interface ISnapshotInLobbyStore extends SnapshotIn<typeof LobbyStore>{}
export interface ISnapshotOutLobbyStore extends SnapshotOut<typeof LobbyStore>{}
export default LobbyStore;
