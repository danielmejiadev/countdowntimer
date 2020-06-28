// Dependencies
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

// Components
import BlinkingText from '../BlinkingText';

// Hooks
import * as Hooks from '../../hooks';

// Under testing
import { TimerDisplay } from './index';
import { Text } from 'react-native';

describe('TimerDisplay', () => {
  let component: ShallowWrapper;
  const state = {
    isPlaying: false,
    isSelecting: false,
    time: 20,
    remainingTime: 10,
  };

  beforeEach(() => {
    jest.spyOn(Hooks, 'useCountdownState').mockReturnValue(state as any);
    component = shallow(<TimerDisplay />);
  });

  it('render correctly', () => {
    const textMessage = component.find(Text);
    const { isBlinking, children } = component
      .find(BlinkingText)
      .props();

    expect(isBlinking).toBeTruthy();
    expect(children).toEqual('00:10');
    expect(textMessage.prop('children')).toEqual('More than halfway there!');
  });


  it('render is over', () => {
    jest.spyOn(Hooks, 'useCountdownState').mockReturnValue({ isSelecting: true, remainingTime: 0, isOver: true } as any);
    component.setProps({});

    const textMessage = component.find(Text);
    expect(textMessage.prop('children')).toEqual('Time’s up!');
  });
});