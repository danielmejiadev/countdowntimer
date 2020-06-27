// Dependencies
import React from 'react';

// State
import { CounterdownState, CounterdownActions } from 'app/counterdownReducer';

export interface CoundownContextType extends CounterdownState {
  remainingTime: number,
  isOver: boolean;
  dispatch: React.Dispatch<CounterdownActions>
}

export const CountdownContext = React.createContext({} as CoundownContextType);