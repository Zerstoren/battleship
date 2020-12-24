import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from "enzyme";
import MainPage from '..';
import { ButtonCreateLobby, ButtonSearchUser } from '../styledComponents';
import { GameStatus } from '../../App/types';

it('render main page', () => {
  const tree = renderer
    .create(<MainPage handleChangeGameStatus={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('check create lobby', () => {
  let gGameStatus = null;
  const handleGameStatus = (gameStatus: GameStatus) => gGameStatus = gameStatus;


  const wrapper = shallow(<MainPage handleChangeGameStatus={handleGameStatus} />);
  wrapper.find(ButtonCreateLobby).simulate('click');
  expect(gGameStatus).toEqual(GameStatus.CREATE_LOBBY);
});

it('check search lobby', () => {
  let gGameStatus = null;
  const handleGameStatus = (gameStatus: GameStatus) => gGameStatus = gameStatus;

  const wrapper = shallow(<MainPage handleChangeGameStatus={handleGameStatus} />);
  wrapper.find(ButtonSearchUser).simulate('click');
  expect(gGameStatus).toEqual(GameStatus.LOBBY_LIST);
});
