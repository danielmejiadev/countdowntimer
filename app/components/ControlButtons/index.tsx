// Dependencies
import React from 'react';
import { View } from 'react-native';
import { Icon, Input } from 'react-native-elements';

// Hooks
import { useCountdownActions, useCountdownState } from '../../hooks';

// Styles
import styles from './styles';

/**
 * Controls counter buttons component.
 * @returns The control buttons.
 */
export function ControlButtons() {
  const { startTimer, toggleTimer, resetTimer } = useCountdownActions();
  const { isPlaying, isSelecting } = useCountdownState();

  const [time, setTime] = React.useState('');
  const starTimer = () => {
    startTimer(+time * 60);
    setTime('');
  };

  const Actions = React.useMemo(() => {
    const isValidTime = Number.isInteger(+time) && +time > 0;

    if (isSelecting) {
      return (
        <React.Fragment>
          <Input
            value={time}
            onChangeText={setTime}
            label="Select time"
            placeholder="(Min)"
            containerStyle={styles.input}
            keyboardType="numeric"
          />
          <Icon disabled={!isValidTime} name="ios-play" type="ionicon" raised reverse onPress={starTimer} />
        </React.Fragment>
      );
    }

    return <Icon name={isPlaying ? "ios-pause" : "ios-play"} type="ionicon" raised reverse onPress={toggleTimer} />;
  }, [time, isPlaying, isSelecting]);

  return (
    <View style={styles.container}>
      <View style={styles.icons}>
        {Actions}
        <Icon name="stop" type="material" raised reverse onPress={resetTimer} />
      </View>
    </View>
  );
}

export default ControlButtons;