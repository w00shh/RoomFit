import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Switch,
  Image,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {serverAxios} from '../../../utils/commonAxios';
import styles from './styles';
import Back from 'react-native-vector-icons/Ionicons';
import {AppContext} from '../../../contexts/AppProvider';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const HeightWeight = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            handleBackButton();
            //navigation.reset({routes: [{name: 'MyRoutine'}]});
          }}>
          <Back
            name="arrow-back"
            color={'#242424'}
            size={25}
            style={{
              marginLeft: 0 * width_ratio,
              marginRight: 10 * width_ratio,
            }}></Back>
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <>
          <Text
            style={{
              marginHorizontal: 6 * width_ratio,
              color: '#242424',
              fontSize: 16,
              fontWeight: '700',
            }}>
            키/몸무게
          </Text>
        </>
      ),
    });
  }, []);

  const handleBackButton = () => {
    navigation.navigate('ProfileSetting');
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.inputContainer}
          value="180"
          placeholderTextColor={'#acacac'}></TextInput>
        <View pointerEvents="none" style={styles.placeholder}>
          <Text style={styles.placeholderText}>cm</Text>
        </View>
      </View>
      <View>
        <TextInput
          style={styles.inputContainer}
          value="80"
          placeholderTextColor={'#acacac'}></TextInput>
        <View pointerEvents="none" style={styles.placeholder}>
          <Text style={styles.placeholderText}>kg</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HeightWeight;
