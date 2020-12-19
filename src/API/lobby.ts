import { ISnapshotOutLobbyStore, lobbyElementsStores } from '../stores/lobby';
import * as lobbyListStore from '../stores/lobbyList';
import client from './index';

export const pubLobby = (lobbyData: ISnapshotOutLobbyStore) => {
  client.send('newLobby', lobbyData);
}

export const unPubLobby = () => {
  client.send('unPubLobby');
}

export const lobbyList = () => {
  client.send('lobbyList');
}

export const connectLobby = (userId: string) => {
  client.send('connectLobby', userId)
}

client.on('message', (path: string, data: any) => {
  if (path === 'lobbyList') {
    lobbyElementsStores.addItems(data);
    lobbyListStore.default.updateFromServer(data);
  }

  if (path === 'opponentDisconnect') {
    import('../stores/mainStore').then((mainStore) => {
      mainStore.default.setError('Opponent disconnect');
    });
  }
});
