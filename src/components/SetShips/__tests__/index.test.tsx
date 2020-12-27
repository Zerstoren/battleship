import { mount } from 'enzyme';
import { Provider } from 'mobx-react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { TestBackend } from 'react-dnd-test-backend';
import { wrapInTestContext } from 'react-dnd-test-utils';
import SetShips from '..';
import { IMainStore, MainStore } from '../../../stores/mainStore';
import { GameStatus } from '../../App/types';

import { act } from 'react-dom/test-utils';

class SetShipsWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const fn = jest.fn();
    return (<SetShips handleChangeGameStatus={fn}/>);
  }
}

describe('SetShips', () => {
  let fn: jest.Mock;
  let mainStore: IMainStore;

  beforeEach(() => {
    fn = jest.fn();
    mainStore = MainStore.create({
      status: GameStatus.SET_SHIPS,
      currentLobby: {
        lobbyName: 'Name',
        x: 10,
        y: 10,
        ships4n: 1,
        ships3n: 1,
        ships2n: 1,
        ships1n: 1,
      }
    });
  });

  test('Check', async () => {
    const SetShipsWrap = wrapInTestContext(SetShipsWrapper);
    const ref: React.RefObject<any> = React.createRef();
    const tree = mount(
      <DndProvider backend={TestBackend}>
        <Provider mainStore={mainStore}>
          <SetShipsWrap ref={ref} />
        </Provider>
      </DndProvider>
    );

    const backend = ref.current.getManager().getBackend();
    const got = tree.find('Cell[x=0][y=0]');
    // console.log(tree.find('Cell[x=0][y=0] td').at(0).instance());
    // act(() => {
    //   backend.simulateBeginDrag(['S100']);
    //   backend.simulateHover(['T0']);      
    //   backend.simulateDrop();
    // });
    // console.log(backend);
    // console.log(backend.registry.dragSources.get('S100'))
    // backend.registry.dragSources.get('S100').beginDrag();
    // console.dir(backend.registry.dropTargets.get('T0'));
    // backend.registry.dropTargets.get('T0').drop(null, {size: 4});
    // console.log(backend.sourceNodes);
    // console.log(tree.find('ShipElement[shipSize=4]'));
    // backend.simulateBeginDrag()
    // console.log(tree.find('SetShipsWrap'));
    // tree.find('ShipElement[shipSize=4] .d-flex div').at(0).simulate('mousedown');
    // tree.find('Cell[x=0][y=0]').simulate('mousemove');
    // tree.find('Cell[x=0][y=0]').simulate('mouseup');

    tree.update();
    console.log(tree.find('Cell[x=0][y=0]').debug());
  });
});
