import React from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './styles';

const Input = props => {
  return (
    <View style={styles.inputContainer}>
      <View>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          inputMode={props.inputMode}
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry}></TextInput>
      </View>
    </View>
  );
  ß;
};

export default Input;
