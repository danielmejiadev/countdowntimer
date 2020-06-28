// Dependencies
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Button } from 'react-native-elements';

// Hooks
import * as Hooks from '../../hooks';

// Under testing
import { SpeendControls } from './index';

describe('SpeendControls', () => {
  let component: ShallowWrapper;
  const speed = {
    id: 1,
    name: 'Name',
  };
  const speed2 = {
    id: 2,
    name: 'Name2',
  };
  const state = {
    speeds: [speed, speed2],
    isPlaying: true,
    selectedSpeed: speed,
  };
  const actions = {
    selectSpeed: jest.fn(),
  };

  beforeEach(() => {
    jest.spyOn(Hooks, 'useCountdownState').mockReturnValue(state as any);
    jest.spyOn(Hooks, 'useCountdownActions').mockReturnValue(actions as any);
    component = shallow(<SpeendControls />);
  });

  it('render correctly', () => {
    const speedButton = component.find(Button).at(0);
    const speed1Button = component.find(Button).at(1);

    speedButton
      .props()
      .onPress?.({} as any);

    expect(actions.selectSpeed).toHaveBeenCalledWith(speed);
    expect(speed1Button).toBeTruthy();
  });
});