// Dependencies
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { View, Animated } from 'react-native';

// Under test
import { BlinkingText } from './index';

describe('BlinkingText', () => {
  let component: ShallowWrapper;
  const props = {
    children: 'text',
    isBlinking: true,
  };
  const animation = {
    start: jest.fn(),
    stop: jest.fn(),
  };
  const opacity = {
    setValue: jest.fn(),
  };

  beforeEach(() => {
    jest.spyOn(React, 'useState').mockReturnValue([opacity] as any)
    jest.spyOn(React, 'useEffect').mockImplementation((callback) => {
      const cleanUp = callback() as () => void;
      cleanUp();
    });
    jest.spyOn(Animated, 'loop').mockReturnValue(animation);
    component = shallow(<BlinkingText {...props} />);
  });

  it('render correctly', () => {
    expect(component.prop('children')).toEqual(props.children);
    expect(animation.start).toHaveBeenCalled();
    expect(animation.stop).toHaveBeenCalled();
    expect(opacity.setValue).toHaveBeenCalledWith(1);
  });
});