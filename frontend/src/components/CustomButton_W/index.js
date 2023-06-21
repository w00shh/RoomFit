import React from 'react';
import {TouchableOpacity, Button, Text, StyleSheet} from 'react-native';
import styles, {CText, CButton} from './styles';

const CustomButton_W = props => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
<<<<<<< HEAD

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
=======
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
>>>>>>> a86a795593dd00a5f678f881d780a952cffdf035
    </TouchableOpacity>
  );
};

export default CustomButton_W;
