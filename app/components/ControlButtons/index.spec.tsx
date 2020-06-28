// Dependencies
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Icon, Input } from 'react-native-elements';

// Hooks
import * as Hooks from '../../hooks';

// Under testing
import { ControlButtons } from './index';

describe('ControlButtons', () => {
  let component: ShallowWrapper;
  const state = {
    isPlaying: false,
    isSelecting: true,
  };
  const actions = {
    startTimer: jest.fn(),
    toggleTimer: jest.fn(),
    resetTimer: jest.fn(),
  };
  const setTime = jest.fn();

  beforeEach(() => {
    jest.spyOn(Hooks, 'useCountdownState').mockReturnValue(state as any);
    jest.spyOn(Hooks, 'useCountdownActions').mockReturnValue(actions as any);
    jest.spyOn(React, 'useState').mockReturnValue(['10', setTime]);
    jest.spyOn(React, 'useCallback').mockImplementation((callback) => callback);
    component = shallow(<ControlButtons />);
  });

  it('render correctly is selecting', () => {
    const play = component.find(Icon).at(0);
    const stop = component.find(Icon).at(1);
    const input = component.find(Input);

    play.prop('onPress')?.({} as any);
    expect(input.prop('value')).toEqual('10');
    expect(play.prop('disabled')).toBeFalsy();
    expect(stop.prop('onPress')).toEqual(actions.resetTimer);
    expect(actions.startTimer).toHaveBeenCalledWith(600);
    expect(setTime).toHaveBeenCalledWith('');
  });
});