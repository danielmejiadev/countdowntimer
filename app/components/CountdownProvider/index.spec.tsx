// Dependencies
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { View } from 'react-native';

// Hooks
import * as Hooks from '../../hooks';

// Under test
import { CountdownProvider } from './index';

describe('CountdownProvider', () => {
  let component: ShallowWrapper;
  const countdownTimer = { time: 0 };

  beforeEach(() => {
    jest.spyOn(Hooks, 'useCountdownCounter').mockReturnValue(countdownTimer as any);
    component = shallow(<CountdownProvider><View /></CountdownProvider>);
  });

  it('render correctly', () => {
    expect(component.prop('value')).toEqual(countdownTimer);
    expect(component.find(View).exists()).toBeTruthy();
  });
});