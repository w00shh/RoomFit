import React from 'react';
import {TouchableOpacity, Button, Text, StyleSheet} from 'react-native';
import styles, {CText, CButton} from './styles';

const CustomButton_W = props => {
  return (
    <TouchableOpacity style={styles.CButton}>
      <Text style={styles.CText} color={props.colors}>
        {props.content}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton_W;
