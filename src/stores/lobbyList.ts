import { applySnapshot, types } from 'mobx-state-tree';
import LobbyStore, { IDataFromServer } from './lobby';

const LobbyElement = types.model('LobbyElement', {
  name: types.identifier,
  value: types.late(() => LobbyStore),
});

const LobbyList = types.model('LobbyList', {
  lobbys: types.map(LobbyElement),
}).actions((self) => ({
  lobbyList() {
    import('../API/lobby').then((apiLobby) => {
      apiLobby.lobbyList();
    }).catch(() => {

    });
  },

  updateFromServer(data: IDataFromServer) {
    const lobbys: Record<string, unknown> = {};

    Object.keys(data).forEach((key: string) => {
      lobbys[key] = {
        name: key,
        value: data[key],
      };
    });

    const snapshotData: Record<string, unknown> = {
      lobbys,
    };

    applySnapshot(self, snapshotData);
  },
}));

const lobbyList = LobbyList.create();

export {
  LobbyList,
};

export default lobbyList;
