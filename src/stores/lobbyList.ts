import { applySnapshot, types } from "mobx-state-tree";
import { lobbyList as APILobbyList } from "../API/lobby";
import lobbyStore from "./lobby";
import { IDataFromServer } from "../components/LobbyList/types";

const LobbyElement = types.model('LobbyElement', {
  name: types.identifier,
  value: types.late(() => lobbyStore)
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
