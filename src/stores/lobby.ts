import { applySnapshot, getSnapshot, types } from "mobx-state-tree";
import { connectLobby, pubLobby } from "../API/lobby";
import { ISnapshotOutLobbyStore } from "./types";

const lobbyStore = types.model('Lobby', {
  lobbyName: types.identifier,
  x: types.optional(types.number, 10),
  y: types.optional(types.number, 10),
  ships4n: types.optional(types.number, 1),
  ships3n: types.optional(types.number, 2),
  ships2n: types.optional(types.number, 3),
  ships1n: types.optional(types.number, 4),
}).actions(self => {
  return {
    publishLobby() {
      // applySnapshot(self, data);
      pubLobby(getSnapshot(self));
    },

    connectToLobby(userId: string) {
      connectLobby(userId)
    }
  }
});

export default lobbyStore;
