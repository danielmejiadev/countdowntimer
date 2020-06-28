// Under test
import { countdownReducer, initialState, CounterdownActionsTypes } from '../counterdownReducer';

describe('CountdownReducer', () => {
  it('should start action', () => {
    const action = {
      type: CounterdownActionsTypes.START,
      payload: 10,
    };
    const state = countdownReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isPlaying: true,
      isSelecting: false,
      isOver: false,
      time: 10,
    })
  });

  it('should change speed action', () => {
    const speed = { id: 1 };
    const action = {
      type: CounterdownActionsTypes.CHANGE_SPEED,
      payload: speed,
    };
    const state = countdownReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      selectedSpeed: speed,
    })
  });

  describe('should increment', () => {
    const action = {
      type: CounterdownActionsTypes.INCREMENT,
    };

    it('sum 1 to passed time', () => {
      const reducerState = {
        ...initialState,
        passedTime: 1,
        time: 11,
      }
      const state = countdownReducer(reducerState, action);
      expect(state).toEqual({ ...reducerState, passedTime: 2 });
    });

    it('isOver', () => {
      const reducerState = {
        ...initialState,
        passedTime: 10,
        time: 11,
      }
      const state = countdownReducer(reducerState, action);
      expect(state).toEqual({ ...initialState, isOver: true });
    });
  });

  it('should toggle action action', () => {
    const action = {
      type: CounterdownActionsTypes.TOGGLE,
    };
    const state = countdownReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isPlaying: true,
    })
  });

  it('should reset store', () => {
    const speed = { id: 1 };
    const action = {
      type: CounterdownActionsTypes.RESET,
    };
    const state = countdownReducer({} as any, action);
    expect(state).toEqual(initialState)
  });
});
