import MainStore from './mainStore';
import { IMainStore } from './types';

interface IStore {
  mainStore: IMainStore 
};

const Stores: IStore = {
  mainStore: MainStore
};

export type {
  IStore
}

export default Stores;
