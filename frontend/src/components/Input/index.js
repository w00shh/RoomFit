import React, {useEffect} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import styles from './styles';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

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
            width: props.isCertification && 225 * width_ratio,
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
                paddingHorizontal: 5 * width_ratio,
                paddingVertical: 5 * height_ratio,
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
