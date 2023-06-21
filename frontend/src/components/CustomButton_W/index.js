import React from 'react';
import {TouchableOpacity, Button, Text, StyleSheet} from 'react-native';
import styles, {CText, CButton} from './styles';

const CustomButton_W = props => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#ffffff',

        borderColor: '#dfdfdf',
        borderStyle: 'solid',

        width: props.width,
        height: 56,

        borderRadius: 8,
        padding: 0,

        marginVertical: 24,
      }}>
      <Text
        style={{
          fontWeight: '400',
          fontSize: 14,
          textAlign: 'center',
        }}
        color={props.colors}>
        {props.content}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton_W;
