// Dependencies
import React from 'react';

// Hooks
import { useCountdownCounter } from '../../hooks';

// Context
import { CountdownContext } from '../../context';

/**
 * Properties definition for {@link CountdownProvider}
 */
export interface CountdownProviderProps {
  children: React.ReactNode,
}

/**
 * Countdown provider component.
 * @param props The properties passed to provider
 * @returns The provider component.
 */
export function CountdownProvider(props: CountdownProviderProps) {
  const { children } = props;
  const countdownCounter = useCountdownCounter();

  return (
    <CountdownContext.Provider value={countdownCounter}>
      {children}
    </CountdownContext.Provider>
  );
}

export default CountdownProvider;