// Dependenceis
import React from 'react';
import { View, Text } from 'react-native';

// Components
import BlinkingText from '../BlinkingText';

// Hooks
import { useCountdownState } from '../../hooks';

// Styles
import styles from './styles';

function formatTimeLeft(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds: string | number = time % 60;
  const displayMinutes = `${minutes}`.padStart(2, '0');
  const displaySeconds = `${seconds}`.padStart(2, '0');

  return `${displayMinutes}:${displaySeconds}`;
}

/**
 * Animated blinking text component.
 * @param props The component properties.
 * @returns The react component.
 */
export function TimerDisplay(): React.ReactElement {
  const { isSelecting, isOver, remainingTime, time } = useCountdownState();
  const firstAlarm = !isSelecting && remainingTime <= 20;
  const secondAlarm = !isSelecting && remainingTime <= 10;
  const isMoreThanHalf = remainingTime <= time / 2;

  return (
    <View style={styles.circleContaier}>
      {isOver && <Text>Time’s up!</Text>}
      {!isSelecting && isMoreThanHalf && <Text>More than halfway there!</Text>}
      <BlinkingText
        isBlinking={secondAlarm}
        style={[styles.blinkingText, firstAlarm && styles.redText]}
      >
        {formatTimeLeft(remainingTime)}
      </BlinkingText>
    </View>
  );
}

/**
 * Component properties values by default.
 */
TimerDisplay.defaultProps = {
  animationDuration: 250,
}

export default TimerDisplay;