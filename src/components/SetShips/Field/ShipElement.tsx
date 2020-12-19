import React, { FC } from 'react';
import { Ship, ShipBlock } from '../../../shared/StyledComponents/Ship';

interface IProp {
  readonly shipSize: number;
}

const ShipElement : FC<IProp> = (props) => {
  const { shipSize } = props;

  const items: JSX.Element[] = [];

  for(let i = 0; i < shipSize; i++) {
    items.push(<ShipBlock key={`ship_size_element_${i}`} />);
  }

  return (
    <Ship>
      {items}
    </Ship>
  );
}

export default ShipElement;
