import { FC } from "react";
import { useDrop } from "react-dnd";
import { MatrixFill, DragObjectItem } from "./types";

interface IProps {
  onDropShip: () => void,
  onShadowShipDrop: (x: number, y: number, shipSize: number) => void,
  fill: MatrixFill,
  x: number,
  y: number,
}

const Cell : FC<IProps> = (props) => {
  const { onDropShip, onShadowShipDrop, x, y, fill } = props;
  const [, drop] = useDrop<DragObjectItem, void, any>({
    accept: 'ship',
    drop: (item, monitor) => {},

    hover: (item, monitor) => {
      onShadowShipDrop(x, y, item.size)
    },

    canDrop: (item) => {
      return true;
    }
  });


  let classNames = '';

  switch(fill) {
    case MatrixFill.SHADOW:
      classNames = 'ship-shadow';
      break;
  }

  return (<td ref={drop} className={classNames}></td>);
};

export default Cell;