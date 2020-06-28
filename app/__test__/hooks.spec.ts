// Dependencies
import React from 'react';
// Context
import { CountdownContext } from '../context';
// State
import { CounterdownActionsTypes } from '../counterdownReducer';
// Under test
import * as Hooks from '../hooks';

describe('Hooks', () => {
  describe('should use countdown counter', () => {
    const state = {
      time: 10,
      passedTime: 5,
      isPlaying: true,
      selectedSpeed: {
        value: 1000,
      }
    };
    const dispatch = jest.fn();
    const interval = 10;

    beforeEach(() => {
      jest.spyOn(React, 'useReducer').mockReturnValue([state, dispatch]);
      jest.spyOn(React, 'useCallback').mockImplementation((callback) => callback);
      jest.spyOn(React, 'useMemo').mockImplementation((callback) => callback());
      jest.spyOn(React, 'useEffect').mockImplementation((callback) => {
        const cleanUp = callback() as () => void;
        cleanUp();
      });
      jest.spyOn(global, 'clearInterval').mockImplementation();
      jest.spyOn(global, 'setInterval').mockImplementation((callback) => {
        callback();
        return interval;
      })
    });

    afterEach(() => jest.clearAllMocks());

    it('should timer is playing', () => {
      const response = Hooks.useCountdownCounter();
      expect(response).toEqual({ ...state, remainingTime: 5, dispatch });
      expect(global.setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
      expect(dispatch)
        .toHaveBeenCalledWith({ type: CounterdownActionsTypes.INCREMENT });
      expect(global.clearInterval).toHaveBeenCalledWith(interval);
    });

    it('should timer stop', () => {
      jest.spyOn(React, 'useReducer').mockReturnValue([{ ...state, isPlaying: false }, dispatch]);

      Hooks.useCountdownCounter();
      expect(global.setInterval).not.toHaveBeenCalled();
      expect(global.clearInterval).toHaveBeenCalledWith(-1);
    });
  });

  it('should use countdown state', () => {
    const state = {};
    jest.spyOn(React, 'useContext').mockReturnValue(state);

    const response = Hooks.useCountdownState();
    expect(response).toEqual(state);
    expect(React.useContext).toHaveBeenCalledWith(CountdownContext);
  });

  it('should use countdown actions', () => {
    const dispatch = jest.fn();
    jest.spyOn(React, 'useCallback').mockImplementation((callback) => callback);
    jest.spyOn(Hooks, 'useCountdownState').mockReturnValue({ dispatch } as any);

    const { startTimer, toggleTimer, resetTimer, selectSpeed } = Hooks.useCountdownActions();
    startTimer(10);
    toggleTimer();
    resetTimer();
    selectSpeed(undefined);

    expect(dispatch)
      .toHaveBeenCalledWith({ type: CounterdownActionsTypes.START, payload: 10 });
    expect(dispatch)
      .toHaveBeenCalledWith({ type: CounterdownActionsTypes.TOGGLE });
    expect(dispatch)
      .toHaveBeenCalledWith({ type: CounterdownActionsTypes.RESET });
    expect(dispatch)
      .toHaveBeenCalledWith({ type: CounterdownActionsTypes.CHANGE_SPEED, payload: undefined });
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});
