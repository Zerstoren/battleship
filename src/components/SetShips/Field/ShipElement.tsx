import React, { FC } from 'react';
import { useDrag } from 'react-dnd';
import { Ship, ShipBlock } from '../../../shared/StyledComponents/Ship';

interface IProp {
  readonly shipSize: number;
}

const ShipElement : FC<IProp> = (props) => {
  const { shipSize } = props;
  const [, drag] = useDrag({
    item: {type: `ship`, size: shipSize}
  });

  const items: JSX.Element[] = [];

  for(let i = 0; i < shipSize; i++) {
    items.push(<ShipBlock key={`ship_size_element_${i}`} />);
  }

  return (
    <Ship ref={drag}>
      {items}
    </Ship>
  );
}

export default ShipElement;
