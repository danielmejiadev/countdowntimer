// Dependencies
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

// Hooks
import { useCountdownActions, useCountdownState } from '../../hooks';

// Styles
import styles from './styles';

export function SpeendControls() {
  const { selectSpeed } = useCountdownActions();
  const { selectedSpeed, isPlaying, speeds } = useCountdownState();

  return (
    <View style={styles.container}>
      {
        speeds.map((speed) => (
          <Button
            key={speed.id}
            title={speed.name}
            onPress={() => isPlaying && selectSpeed(speed)}
            containerStyle={styles.buttonContainer}
            buttonStyle={[styles.speedButton, speed.id === selectedSpeed.id && styles.selectedButton]}
          />
        ))
      }
    </View>
  );
}

export default SpeendControls;