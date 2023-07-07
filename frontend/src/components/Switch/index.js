import React, {useState} from 'react';
import {Switch, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const OnOff = props => {
  const [isEnabled, setIsEnabled] = useState(props.isEnabled);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <Switch
      trackColor={{false: '#acacac', true: '#5252fa'}}
      thumbColor={'#fff'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
      style={{
        transform: [
          {
            scaleX:
              Platform.OS === 'ios' ? 0.8 * height_ratio : 1.2 * height_ratio,
          },
          {
            scaleY:
              Platform.OS === 'ios' ? 0.8 * width_ratio : 1.2 * width_ratio,
          },
        ],
        marginRight: props.marginRight,
      }}
    />
  );
};

export default OnOff;
