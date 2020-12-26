import React from 'react';
import {mount} from 'enzyme';
import WaitConnect from '..';
import { GameStatus } from '../../App/types';

describe('WaitConnect', () => {
  test('Back to the main page', () => {
    const fn = jest.fn();
    const tree = mount(<WaitConnect handleChangeGameStatus={fn}></WaitConnect>);
    tree.find('.btn').simulate('click');

    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0]).toBe(GameStatus.MAIN);
  })
});