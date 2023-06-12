import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const Input = props => {
  return (
    <View style={styles.inputContainer}>
      <View>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        inputMode={props.inputMode}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    width: 358,
    paddingTop: 8,
    marginVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },

  label: {
    color: '#808080',
    fontSize: 12,
  },
});

export default Input;
