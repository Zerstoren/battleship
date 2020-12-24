import React, { FC } from 'react';
import { useDrop } from 'react-dnd';
import { MatrixFill, DragObjectItem } from './types';

interface IProps {
  onDropShip: (x: number, y: number, shipSize: number) => void,
  onShadowShipDrop: (x: number, y: number, shipSize: number) => void,
  onRemoveFromField: (x: number, y: number) => void,
  onCanDrop: (x: number, y: number, shipSize: number) => boolean,
  fill: MatrixFill,
  x: number,
  y: number,
  disabled: boolean,
}

const Cell : FC<IProps> = (props: IProps) => {
  const {
    onDropShip, onShadowShipDrop, onRemoveFromField, onCanDrop, x, y, fill, disabled,
  } = props;
  const [, drop] = useDrop<DragObjectItem, void, unknown>({
    accept: 'ship',
    drop: (item) => {
      onDropShip(x, y, item.size);
    },

    hover: (item) => {
      onShadowShipDrop(x, y, item.size);
    },

    canDrop: (item) => onCanDrop(x, y, item.size),
  });

  const handleClick = () => fill === MatrixFill.SET && onRemoveFromField(x, y);

  let classNames = '';

  switch (fill) {
    case MatrixFill.SHADOW:
      classNames = 'ship-shadow';
      break;

    case MatrixFill.ERR_SHADOW:
      classNames = 'ship-err-shadow';
      break;

    case MatrixFill.SET:
      classNames = 'ship-set';
      break;

    default:
      break;
  }

  if (classNames && disabled) {
    classNames = 'disabled';
  }

  return (<td ref={drop} className={classNames} onClick={handleClick} />);
};

export default Cell;
