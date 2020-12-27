import { observer, inject } from 'mobx-react';
import React, { FC, useEffect } from 'react';
import { AppHeader } from '../../shared/StyledComponents/Headers';
import { ILobbyStore } from '../../stores/lobby';
import { ILobbyList } from '../../stores/lobbyList';
import { GameStatus, ISetLobbyProps } from '../App/types';
import { LobbyTable } from './styledComponents';

interface IProps extends ISetLobbyProps {
  lobbyList?: ILobbyList
}

const LobbyList: FC<IProps> = inject('lobbyList')(observer((props: IProps) => {
  const lobbyList = props.lobbyList as ILobbyList;
  const { handleSetLobby } = props;

  useEffect(() => {
    lobbyList.lobbyList();
  }, [lobbyList]);

  const handleJoin = (user: string, lobby: ILobbyStore) => {
    lobby.connectToLobby(user);
    handleSetLobby(
      GameStatus.SET_SHIPS,
      lobby,
    );
  };

  const items: JSX.Element[] = [];
  for (const record of lobbyList?.lobbys.values()) {
    items.push(
      <tr key={record.name}>
        <td>
          <button className="btn btn-secondary" onClick={() => handleJoin(record.name, record.value)}>Join</button>
        </td>
        <td>{record.value.lobbyName}</td>
        <td>
          {record.value.x}
          x
          {record.value.y}
        </td>
        <td>
          {record.value.ships4n}
          /
          {record.value.ships3n}
          /
          {record.value.ships2n}
          /
          {record.value.ships1n}
        </td>
      </tr>,
    );
  }

  return (
    <>
      <AppHeader>Lobby list</AppHeader>
      <LobbyTable>
        <thead>
          <tr>
            <td />
            <td>Lobby name</td>
            <td>Field size</td>
            <td>Ships 4x/3x/2x/1x</td>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>

      </LobbyTable>
    </>
  );
}));

export default LobbyList;
