// Dependencies
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

// Components
import ControlButtons from '../ControlButtons';
import SpeedControls from '../SpeedControls';
import TimerDisplay from '../TimerDisplay';

// Under test
import { CountdownTimer } from './index';

describe('CountdownTimer', () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = shallow(<CountdownTimer />);
  });

  it('render correctly', () => {
    expect(component.find(TimerDisplay).exists()).toBeTruthy();
    expect(component.find(SpeedControls).exists()).toBeTruthy();
    expect(component.find(ControlButtons).exists()).toBeTruthy();
  });
});