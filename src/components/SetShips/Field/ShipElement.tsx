import React, { FC } from 'react';
import { useDrag } from 'react-dnd';
import { Ship, ShipBlock } from '../../../shared/StyledComponents/Ship';

interface IProp {
  onDragComplete: () => void,
  shipSize: number,
  disabled: boolean,
}

const ShipElement : FC<IProp> = (props: IProp) => {
  const { shipSize, onDragComplete, disabled } = props;
  const [, drag] = useDrag({
    item: { type: 'ship', size: shipSize },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        onDragComplete();
      }
    },
  });

  const items: JSX.Element[] = [];

  for (let i = 0; i < shipSize; i++) {
    items.push(<ShipBlock key={`ship_size_element_${i}`} />);
  }

  if (disabled) {
    return (
      <Ship className="disabled">
        {items}
      </Ship>
    );
  }
  return (
    <Ship ref={drag}>
      {items}
    </Ship>
  );
};

export default ShipElement;
