import React from 'react';
import {TouchableOpacity, Button, Text, StyleSheet} from 'react-native';
import styles, {CText, CButton} from './styles';

const CustomButton_W = props => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: props.width,
        height: 56,
        padding: 0,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#dfdfdf',
        borderStyle: 'solid',
        marginVertical: 24,
      }}
      onPress={props.onPress}
      disabled={props.disabled}>
      <Text style={styles.CText}>{props.content}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton_W;
