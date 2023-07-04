import React, {useState} from 'react';
import {TouchableOpacity, Button, Text, StyleSheet} from 'react-native';
import styles, {CText, CButton} from './styles';

const CustomButton_B = props => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: props.disabled ? '#cbcbfd' : '#5252fa',

        width: props.width,
        height: props.height ? props.height : 56,

        borderRadius: 8,
        padding: 0,

        marginVertical: props.marginVertical ? props.marginVertical : 24,
      }}
      onPress={props.onPress}
      disabled={props.disabled}>
      <Text style={styles.CText}>{props.content}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton_B;
