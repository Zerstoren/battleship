import React, { FC } from 'react';
import { unPubLobby } from '../../API/lobby';
import { AppHeader } from '../../shared/StyledComponents/Headers';
import { GameStatus, IProps } from '../App/types';

const WaitConnect: FC<IProps> = (props: IProps) => {
  const stopProcessing = () => {
    unPubLobby();
    props.handleChangeGameStatus(GameStatus.MAIN);
  };

  return (
    <>
      <AppHeader>Wait connect</AppHeader>
      <button className="btn btn-warning" onClick={stopProcessing}>Discard</button>
    </>
  );
};

export default WaitConnect;
