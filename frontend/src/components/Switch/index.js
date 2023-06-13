import React, {useState} from 'react';
import {Switch} from 'react-native';

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
    />
  );
};

export default OnOff;