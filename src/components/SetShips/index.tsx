import { inject, observer } from 'mobx-react';
import React, { FC } from 'react';
import TableField from './Field/TableField';
import { IProps } from './types';


const SetShips: FC<IProps> = inject('mainStore')(observer((props) => {
  const mainStore = props.mainStore;
  const lobby = mainStore?.currentLobby;
  
  return (
    <>
      <TableField lobby={lobby} />
    </>

  );
}));


export default SetShips;
