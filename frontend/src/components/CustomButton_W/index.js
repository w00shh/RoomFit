import React from 'react';
import {TouchableOpacity, Text, Dimensions} from 'react-native';
import styles from './styles';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

const CustomButton_W = props => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: props.width,
        height: 56 * height_ratio,
        padding: 0,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#dfdfdf',
        borderStyle: 'solid',
        marginVertical: 24 * height_ratio,
      }}
      onPress={props.onPress}
      disabled={props.disabled}>
      <Text style={styles.CText}>{props.content}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton_W;
