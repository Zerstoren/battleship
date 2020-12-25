import { Provider } from 'mobx-react';
import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import renderer from 'react-test-renderer';
import App from '..';
import { MainStore } from '../../../stores/mainStore';
import { matrix } from "../../SetShips/Field/TableField/helperFn";
import { GameStatus } from '../types';

describe('App snapshots', () => {
  it('Check main page', () => {
    let mainStore = MainStore.create({
      status: GameStatus.MAIN
    });
    
    const wrapper = renderer.create(<Provider mainStore={mainStore}><App /></Provider>);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('Check create lobby', () => {
    let mainStore = MainStore.create({
      status: GameStatus.CREATE_LOBBY
    });
    
    const wrapper = renderer.create(<Provider mainStore={mainStore}><App /></Provider>);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('Check lobby list', () => {
    let mainStore = MainStore.create({
      status: GameStatus.LOBBY_LIST
    });
    
    const wrapper = renderer.create(<Provider mainStore={mainStore}><App /></Provider>);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('Check wait connect', () => {
    let mainStore = MainStore.create({
      status: GameStatus.WAIT_CONNECT
    });
    
    const wrapper = renderer.create(<Provider mainStore={mainStore}><App /></Provider>);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('Check set ships', () => {
    let mainStore = MainStore.create({
      status: GameStatus.SET_SHIPS,
      currentLobby: {
        lobbyName: 'Ok',
        x: 10,
        y: 10,
        ships4n: 1,
        ships3n: 1,
        ships2n: 1,
        ships1n: 1,
      }
    });
    
    const wrapper = renderer.create(
      <Provider mainStore={mainStore}>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </Provider>
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('Check game', () => {
    let mainStore = MainStore.create({
      status: GameStatus.GAME,
      gameMatrix: matrix(10, 10),
      currentLobby: {
        lobbyName: 'Ok',
        x: 10,
        y: 10,
        ships4n: 1,
        ships3n: 1,
        ships2n: 1,
        ships1n: 1,
      }
    });
    
    const wrapper = renderer.create(<Provider mainStore={mainStore}><App /></Provider>);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('Check game win', () => {
    let mainStore = MainStore.create({
      status: GameStatus.GAMEWIN
    });
    
    const wrapper = renderer.create(<Provider mainStore={mainStore}><App /></Provider>);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('Check game over', () => {
    let mainStore = MainStore.create({
      status: GameStatus.GAMEOVER
    });
    
    const wrapper = renderer.create(<Provider mainStore={mainStore}><App /></Provider>);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
})