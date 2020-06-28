// Dependencies
import React from 'react';
// Context
import { CoundownContextType, CountdownContext } from './context';
// State
import { countdownReducer, CounterdownActionsTypes, initialState } from './counterdownReducer';

/**
 * Creates a countdown state based on reducer.
 * @returns The countdown state.
 */
export function useCountdownCounter() {
  const [state, dispatch] = React.useReducer(countdownReducer, initialState);
  const { time, passedTime, isPlaying, selectedSpeed } = state;
  const remainingTime = React.useMemo(() => time - passedTime, [time, passedTime]);

  const timer = React.useCallback(() => {
    if (isPlaying) {
      return setInterval(() => dispatch({ type: CounterdownActionsTypes.INCREMENT }), selectedSpeed.value);
    }

    return -1;
  }, [isPlaying, selectedSpeed])

  React.useEffect(() => {
    const interval = timer();
    return () => clearInterval(interval);
  }, [timer]);

  return { ...state, remainingTime, dispatch }
}

/**
 * Gets the countdown actions available.
 * @returns State actions.
 */
export function useCountdownActions() {
  const { dispatch } = exports.useCountdownState();
  const startTimer = React.useCallback((selectedTime) => dispatch({ type: CounterdownActionsTypes.START, payload: selectedTime }), []);
  const toggleTimer = React.useCallback(() => dispatch({ type: CounterdownActionsTypes.TOGGLE }), []);
  const resetTimer = React.useCallback(() => dispatch({ type: CounterdownActionsTypes.RESET }), []);
  const selectSpeed = React.useCallback((payload) => dispatch({ type: CounterdownActionsTypes.CHANGE_SPEED, payload }), []);

  return { startTimer, toggleTimer, resetTimer, selectSpeed }
}

/**
 * Gets the countdown state.
 */
export function useCountdownState(): CoundownContextType {
  return React.useContext(CountdownContext);
}