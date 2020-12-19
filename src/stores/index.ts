import MainStore, { IMainStore } from './mainStore';

interface IStore {
  mainStore: IMainStore 
};

const Stores: IStore = {
  mainStore: MainStore,
};

export type {
  IStore
}

export default Stores;
