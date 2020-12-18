import { inject, observer } from 'mobx-react';
import React, { FC } from 'react';
import { ILobbyStore } from '../../stores/types';
import CreateLobby from '../CreateLobby';
import LobbyList from '../LobbyList';
import Main from '../MainPage';
import WaitConnect from '../WaitConnect';
import { AlertError, CenteredDiv } from './styledComponents';
import { GameStatus, IAppProps } from './types';

const App: FC<IAppProps> = inject("mainStore")(observer((props) => {
  const state = props.mainStore;

  const handleGameStart = (startGame: GameStatus) => state!.setGameStatus(startGame);
  const handleSetLobby = (startGame: GameStatus, lobby: ILobbyStore) => state!.setLobby(startGame, lobby);
  const handleAcceptError = () => state?.setError('');

  let component = null;
  
  switch(state!.status) {
    case GameStatus.MAIN:
      component = (<Main handleChangeGameStatus={handleGameStart} />);
      break;
    
    case GameStatus.CREATE_LOBBY:
      component = (<CreateLobby handleChangeGameStatus={handleGameStart} />);
      break;

    case GameStatus.WAIT_CONNECT:
      component = (<WaitConnect handleChangeGameStatus={handleGameStart} />);
      break;

    case GameStatus.LOBBY_LIST:
      component = (<LobbyList handleSetLobby={handleSetLobby} />);
      break;
  }

  let err = null;
  
  if (state!.error) {
    err = <AlertError>
      <strong>{state!.error}</strong>
      <button type="button" className="btn-close" onClick={handleAcceptError}></button>
    </AlertError>;
  }

  return (
    <>
      {err}
      <CenteredDiv>
        {component}
      </CenteredDiv>
    </>
  );
}));

export default App;
