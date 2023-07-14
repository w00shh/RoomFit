import React from 'react';
import {TouchableOpacity, Text, Dimensions} from 'react-native';
import styles from './styles';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const CustomButton_B = props => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: props.disabled ? '#cbcbfd' : '#5252fa',

        width: props.width,
        height: props.height ? props.height : 56 * height_ratio,

        borderRadius: 8,
        padding: 0,

        marginVertical:
          props.marginVertical != null
            ? props.marginVertical
            : 24 * height_ratio,
      }}
      onPress={props.onPress}
      disabled={props.disabled}>
      <Text style={styles.CText}>{props.content}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton_B;
