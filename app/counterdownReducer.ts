export interface Speed {
  id: number;
  name: string;
  value: number;
}

export interface CounterdownState {
  time: number;
  passedTime: number;
  isPlaying: boolean;
  isOver: boolean;
  isSelecting: boolean;
  selectedSpeed: Speed;
  speeds: Speed[]
}

export enum CounterdownActionsTypes {
  START = 'START',
  INCREMENT = 'INCREMENT',
  TOGGLE = 'TOGGLE',
  CHANGE_SPEED = 'CHANGE-SPEED',
  RESET = 'RESET',
}

export interface CounterdownActions {
  type: CounterdownActionsTypes;
  payload?: any
}

const speeds = [
  {
    id: 1,
    name: '1X',
    value: 1000,
  },
  {
    id: 2,
    name: '1.5X',
    value: 750,
  },
  {
    id: 3,
    name: '2X',
    value: 500,
  }
];

export const initialState = {
  time: 0,
  passedTime: 0,
  isPlaying: false,
  isSelecting: true,
  isOver: false,
  selectedSpeed: speeds[0],
  speeds,
}

/**
 * Reducer to manage the countdown actions.
 * @param state The countdown state.
 * @param action The action to manage
 * @returns The new state.
 */
export function countdownReducer(state: CounterdownState, action: CounterdownActions) {
  switch (action.type) {
    case CounterdownActionsTypes.START:
      return {
        ...state,
        isPlaying: true,
        isSelecting: false,
        isOver: false,
        time: action.payload
      };
    case CounterdownActionsTypes.INCREMENT:
      const nextPassedTime = state.passedTime + 1;
      const isOver = nextPassedTime === state.time;

      if (isOver) {
        return {
          ...initialState,
          isOver,
        };
      }

      return {
        ...state,
        passedTime: nextPassedTime,
      }
    case CounterdownActionsTypes.CHANGE_SPEED:
      return {
        ...state,
        selectedSpeed: action.payload,
      }
    case CounterdownActionsTypes.TOGGLE:
      return {
        ...state,
        isPlaying: !state.isPlaying,
      }
    case CounterdownActionsTypes.RESET:
      return initialState;
    default:
      return state;
  }
}