import React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import { Provider } from 'mobx-react';
import { ILobbyList, LobbyList as LobbyListStore } from '../../../stores/lobbyList';
import LobbyList from '..';
import { applySnapshot } from 'mobx-state-tree';
import { ILobbyStore } from '../../../stores/lobby';
import { GameStatus } from '../../App/types';

describe('LobbyList', () => {
  let tree: ReactWrapper;
  let fn: jest.Mock;
  let lobbyList: ILobbyList;

  beforeEach(() => {
    lobbyList = LobbyListStore.create();
    fn = jest.fn(() => null);
  });
  
  test('Snapshot empty list', () => {
    tree = mount(<Provider lobbyList={lobbyList}><LobbyList handleSetLobby={fn} /></Provider>)
    expect(tree.debug()).toMatchSnapshot();
  });

  test('Snapshot load on startup item', () => {
    jest.spyOn(lobbyList, 'lobbyList').mockImplementation(() => {
      applySnapshot(lobbyList, {lobbys: {
        'LName': {
          'name': 'LName',
          'value': {
            'lobbyName': 'S',
            'x': 10,
            'y': 10,
            'ships4n': 1,
            'ships3n': 1,
            'ships2n': 1,
            'ships1n': 1,
          }
        }
      }})
    });
    let tree = mount(<Provider lobbyList={lobbyList}><LobbyList handleSetLobby={fn} /></Provider>)
    expect(tree.debug()).toMatchSnapshot();
  });

  test('Join to lobby', () => {
    jest.spyOn(lobbyList, 'lobbyList').mockImplementation(() => {
      applySnapshot(lobbyList, {lobbys: {
        'LName': {
          'name': 'LName',
          'value': {
            'lobbyName': 'S',
            'x': 10,
            'y': 10,
            'ships4n': 1,
            'ships3n': 1,
            'ships2n': 1,
            'ships1n': 1,
          }
        }
      }})
    });

    
    let tree = mount(<Provider lobbyList={lobbyList}><LobbyList handleSetLobby={fn} /></Provider>)
    const lobby = lobbyList.lobbys.get('LName')?.value as ILobbyStore;

    const fnConnectToLobby = jest.spyOn(lobby, "connectToLobby");
    
    tree.find('.btn-secondary').simulate('click');

    expect(fnConnectToLobby).toHaveBeenCalled();
    expect(fnConnectToLobby.mock.calls[0][0]).toBe('LName');
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0]).toBe(GameStatus.SET_SHIPS);
    expect(fn.mock.calls[0][1]).toBe(lobby);
  });
});