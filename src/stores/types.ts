import { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';
import lobbyStore from './lobby';
import MainStore from './mainStore';

export interface IMainStore extends Instance<typeof MainStore>{};

export interface ILobbyStore extends Instance<typeof lobbyStore>{};
export interface ISnapshotInLobbyStore extends SnapshotIn<typeof lobbyStore>{};
export interface ISnapshotOutLobbyStore extends SnapshotOut<typeof lobbyStore>{};
