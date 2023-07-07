import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  TextInput,
  Platform,
} from 'react-native';
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
          }}>
          <Back
            name="arrow-back"
            color="#242424"
            size={25}
            style={{
              marginRight: Platform.OS === 'ios' ? 0 : 10 * width_ratio,
            }}></Back>
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <>
          <Text
            style={{
              marginHorizontal: Platform.OS === 'ios' ? 0 : 6 * width_ratio,
              color: '#242424',
              fontSize: 16 * height_ratio,
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
