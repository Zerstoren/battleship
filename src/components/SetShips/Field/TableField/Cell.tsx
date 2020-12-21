import { FC } from "react";
import { useDrop } from "react-dnd";
import { MatrixFill, DragObjectItem } from "./types";

interface IProps {
  onDropShip: (x: number, y: number, shipSize: number) => void,
  onShadowShipDrop: (x: number, y: number, shipSize: number) => void,
  onRemoveFromField: (x: number, y: number) => void,
  fill: MatrixFill,
  x: number,
  y: number,
}

const Cell : FC<IProps> = (props) => {
  const { onDropShip, onShadowShipDrop, onRemoveFromField, x, y, fill } = props;
  const [, drop] = useDrop<DragObjectItem, void, any>({
    accept: 'ship',
    drop: (item, monitor) => {
      onDropShip(x, y, item.size);
    },

    hover: (item, monitor) => {
      onShadowShipDrop(x, y, item.size)
    },
    
    canDrop: (item, monitor) => {
      return true;
    }    
  });

  const handleClick = () =>
    fill === MatrixFill.SET && onRemoveFromField(x, y)

  let classNames = '';

  switch(fill) {
    case MatrixFill.SHADOW:
      classNames = 'ship-shadow';
      break;

    case MatrixFill.ERR_SHADOW:
      classNames = 'ship-err-shadow';
      break;

    case MatrixFill.SET:
      classNames = 'ship-set';
      break;
  }

  return (<td ref={drop} className={classNames} onClick={handleClick}></td>);
};

export default Cell;