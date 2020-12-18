import * as lobbyListStore from '../stores/lobbyList';
import mainStore from '../stores/mainStore';
import { ISnapshotOutLobbyStore } from '../stores/types';
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
    lobbyListStore.default.updateFromServer(data);
  }

  if (path === 'opponentDisconnect') {
    mainStore.setError('Opponent disconnect');
  }
});
