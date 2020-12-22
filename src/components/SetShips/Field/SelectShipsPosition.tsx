import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { ShipBlockElement, ShipBlockPadding } from '../styledComponents';
import ShipElement from './ShipElement';

interface IProp {
  state: any
}


const SelectShipsPosition: FC<IProp> = observer((props) => {
  const {state} = props;

  return (
    <>
      <ShipBlockPadding>
        <ShipBlockElement>
          <ShipElement shipSize={4} disabled={!Boolean(state.ships4n)} onDragComplete={() => state.decraseShip(4)} />
          <span> x {state.ships4n}</span>
        </ShipBlockElement>
        <ShipBlockElement>
          <ShipElement shipSize={3} disabled={!Boolean(state.ships3n)} onDragComplete={() => state.decraseShip(3)} />
          <span> x {state.ships3n}</span>
        </ShipBlockElement>
        <ShipBlockElement>
          <ShipElement shipSize={2} disabled={!Boolean(state.ships2n)} onDragComplete={() => state.decraseShip(2)} />
          <span> x {state.ships2n}</span>
        </ShipBlockElement>
        <ShipBlockElement>
          <ShipElement shipSize={1} disabled={!Boolean(state.ships1n)} onDragComplete={() => state.decraseShip(1)} />
          <span> x {state.ships1n}</span>
        </ShipBlockElement>

        {props.children}
      </ShipBlockPadding>
    </>
  );
});

export default SelectShipsPosition;