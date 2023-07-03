import React, {useEffect} from 'react';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import CustomButton_B from '../CustomButton_B';

const Input = props => {
  return (
    <View
      style={
        props.isCertificationNumberVisible
          ? {
              ...styles.inputContainer,
              borderWidth: 1,
              borderColor: '#5252fa',
            }
          : styles.inputContainer
      }>
      {props.label && (
        <View>
          <Text style={styles.label}>{props.label}</Text>
        </View>
      )}
      <View style={styles.inputBox}>
        <TextInput
          style={{
            width: props.isCertification && 225,
          }}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          inputMode={props.inputMode}
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry}
          editable={!props.isCertificated}></TextInput>
        {props.isCertification &&
          (props.isCertificated ? (
            <Text style={{color: '#5252fa'}}>인증완료</Text>
          ) : (
            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 8,
                borderWidth: props.disabled ? 0 : 0.5,
                borderColor: '#5252fa',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              disabled={props.disabled}
              onPress={props.onPress}>
              <Text
                style={{
                  color: props.disabled ? '#dfdfdf' : '#5252fa',
                }}>
                {props.certificationContent}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
  ß;
};

export default Input;
