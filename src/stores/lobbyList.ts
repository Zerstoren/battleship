import { applySnapshot, types } from "mobx-state-tree";
import { lobbyList as APILobbyList } from "../API/lobby";
import { IDataFromServer } from "../components/LobbyList/types";
import LobbyStore from "./lobby";

const LobbyElement = types.model('LobbyElement', {
  name: types.identifier,
  value: types.late(() => LobbyStore)
});

const LobbyList = types.model('LobbyList', {
  lobbys: types.map(LobbyElement)
}).actions(self => ({
  lobbyList () {
    APILobbyList();
  },
  
  updateFromServer (data: IDataFromServer) {
    const lobbys: any = {};

    Object.keys(data).forEach((key: string) => {
      lobbys[key] = {
        name: key,
        value: data[key]
      };
    });

    const snapshotData: any = {
      lobbys: lobbys
    };

    applySnapshot(self, snapshotData);
  }
}));

const lobbyList = LobbyList.create();

export {
  LobbyList
};

export default lobbyList;
