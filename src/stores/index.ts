import mainStore, { IMainStore } from './mainStore';

interface IStore {
  mainStore: IMainStore
}

const Stores: IStore = {
  mainStore,
};

export type {
  IStore,
};

export default Stores;
