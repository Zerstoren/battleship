import React, { FC } from 'react';
import { ILobbyStore } from '../../../stores/lobby';
import { ShipBlockElement, ShipBlockPadding } from '../styledComponents';
import ShipElement from './ShipElement';

interface IProp {
  lobby: ILobbyStore
}

const SelectShipsPosition: FC<IProp> = (props) => {
  const lobby = props.lobby;

  return (
    <>
      <ShipBlockPadding>
        <ShipBlockElement>
          <ShipElement shipSize={4} />
          <span> x {lobby.ships4n}</span>
        </ShipBlockElement>
        <ShipBlockElement>
          <ShipElement shipSize={3} />
          <span> x {lobby.ships4n}</span>
        </ShipBlockElement>
        <ShipBlockElement>
          <ShipElement shipSize={2} />
          <span> x {lobby.ships4n}</span>
        </ShipBlockElement>
        <ShipBlockElement>
          <ShipElement shipSize={1} />
          <span> x {lobby.ships4n}</span>
        </ShipBlockElement>
      </ShipBlockPadding>
    </>
  );
}

export default SelectShipsPosition;