import { GameStatus } from '../components/App/types';
import { ISnapshotOutLobbyStore, lobbyElementsStores, IDataFromServer } from '../stores/lobby';

import client from './index';

export const pubLobby = (lobbyData: ISnapshotOutLobbyStore) : void => {
  client.send('newLobby', lobbyData);
};

export const unPubLobby = () : void => {
  client.send('unPubLobby');
};

export const lobbyList = () : void => {
  client.send('lobbyList');
};

export const connectLobby = (userId: string) : void => {
  client.send('connectLobby', userId);
};

client.on('message', (path: string, data: IDataFromServer) => {
  if (path === 'lobbyList') {
    lobbyElementsStores.addItems(data);
    import('../stores/lobbyList').then((lobbyListStore) => {
      lobbyListStore.default.updateFromServer(data);
    }).catch(() => {

    });
  }

  if (path === 'opponentDisconnect') {
    import('../stores/mainStore').then((mainStore) => {
      mainStore.default.setError('Opponent disconnect');
    }).catch(() => {

    });
  }

  if (path === 'gamePrepare') {
    import('../stores/mainStore').then((mainStore) => {
      if (mainStore.default.status === GameStatus.WAIT_CONNECT && mainStore.default.currentLobby !== null) {
        mainStore.default.setGameStatus(GameStatus.SET_SHIPS);
      }
    }).catch(() => {

    });
  }
});
