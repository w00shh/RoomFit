import {
  Dimensions,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {useRef} from 'react';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

export const Switch = props => {
  const colorIndex = useRef(new Animated.Value(props.on ? 1 : 0)).current;
  const ellipsePosition = useRef(new Animated.Value(props.on ? 1 : 0)).current;
  // const ellipseScale = useRef(new Animated.Value(0)).current;

  let colors = colorIndex.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ACACAC', '#5252FA'],
  });

  let positions = ellipsePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 44 * width_ratio - 20 * width_ratio - 4 * width_ratio],
  });

  // let scale = ellipseScale.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [20 * width_ratio, 27 * width_ratio],
  // });

  const onChange = () => {
    Animated.spring(colorIndex, {
      toValue: !props.on ? 1 : 0,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    Animated.spring(ellipsePosition, {
      toValue: !props.on ? 1 : 0,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  // const onPressing = () => {
  //   Animated.spring(ellipseScale, {
  //     toValue: 1,
  //     easing: Easing.linear,
  //     useNativeDriver: false,
  //   }).start();
  // };

  // const onLeave = () => {
  //   Animated.spring(ellipseScale, {
  //     toValue: 0,
  //     easing: Easing.linear,
  //     useNativeDriver: false,
  //   }).start();
  // };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.onPress();
        onChange();
      }}>
      <Animated.View
        style={{
          width: 44 * width_ratio,
          height: 24 * height_ratio,
          borderRadius: 100 * height_ratio,

          paddingVertical: 2 * height_ratio,
          paddingHorizontal: 2 * width_ratio,

          backgroundColor: colors,
        }}>
        <Animated.View
          style={{
            width: 20 * width_ratio,
            height: 20 * height_ratio,
            backgroundColor: '#FFFFFF',
            borderRadius: 10 * height_ratio,
            transform: [{translateX: positions}],
          }}></Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
