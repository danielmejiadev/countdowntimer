// Dependenceis
import React from 'react';
import { TextProps, Animated, StyleProp, TextStyle } from 'react-native';

/**
 * Properties definition for {@link BlinkingText}
 */
export interface BlinkingTextProps extends TextProps {
  children: string;
  isBlinking: boolean;
  style: StyleProp<TextStyle>;
  animationDuration?: number;
}

/**
 * Animated blinking text component.
 * @param props The component properties.
 * @returns The react component.
 */
export function BlinkingText(props: BlinkingTextProps): React.ReactElement {
  const { children, isBlinking, style, animationDuration } = props;
  const [opacity] = React.useState(new Animated.Value(1));

  React.useEffect(() => {
    const { sequence, loop, timing } = Animated;
    const animation = loop(
      sequence([
        timing(opacity, { toValue: 0, duration: animationDuration }),
        timing(opacity, { toValue: 1, duration: animationDuration }),
      ]),
    );

    if (isBlinking) {
      animation.start();
    }

    return () => {
      animation.stop();
      opacity.setValue(1);
    };
  }, [isBlinking]);

  return (
    <Animated.Text style={[style, { opacity }]}>{children}</Animated.Text>
  );
}

/**
 * Component properties values by default.
 */
BlinkingText.defaultProps = {
  animationDuration: 250,
}

export default BlinkingText;