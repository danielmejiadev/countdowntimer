// Dependenceis
import React from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Components
import ControlButtons from '../ControlButtons';
import SpeedControls from '../SpeedControls';
import TimerDisplay from '../TimerDisplay';

// Styles
import styles from './styles';

/**
 * Counterdown timer container
 * @returns The counter component.
 */
export function CountdownTimer() {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Countdown Timer</Text>
        <View style={styles.counterContainer}>
          <TimerDisplay />
        </View>
        <SpeedControls />
        <ControlButtons />
      </View>
    </KeyboardAwareScrollView>
  )
};

export default CountdownTimer;
