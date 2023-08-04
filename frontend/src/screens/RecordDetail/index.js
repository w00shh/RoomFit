import {useEffect, useState} from 'react';
import {Dimensions, View, TouchableOpacity, Text} from 'react-native';
import styles from './styles';

//svg
import Back from '../../assets/svg/buttons/single/back.svg';
import RecordDeleteModal from '../../components/Modal/RecordDelete';
import {serverAxios} from '../../utils/commonAxios';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const RecordDetail = ({navigation, route}) => {
  const [isRecordDeleteModalVisible, setIsRecordDeleteModalVisible] =
    useState(false);

  const handleCancelPress = () => {
    setIsRecordDeleteModalVisible(false);
  };

  const handleDeletePress = async () => {
    const targeturl = '/workout/delete/record/' + route.params.record.record_id;
    await serverAxios
      .delete(targeturl)
      .then(res => {})
      .catch(e => {
        console.log(e);
      });
    setIsRecordDeleteModalVisible(false);
    navigation.push('WorkoutDetail', {
      workout_id: route.params.workout_id,
      title: route.params.title,
      start_time: route.params.start_time,
      end_time: route.params.end_time,
      targets: route.params.targets,
      total_time: route.params.total_time,
      total_weight: route.params.total_weight,
      memo: route.params.memo,
      startingPoint: route.params.startingPoint,
    });
  };
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Back height={24 * height_ratio} width={24 * width_ratio} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text
          style={{
            marginHorizontal: Platform.OS === 'ios' ? 0 : 6 * width_ratio,
            color: '#242424',
            fontSize: 16 * height_ratio,
            fontWeight: '700',
          }}>
          {route.params.record.motion_name}
        </Text>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setIsRecordDeleteModalVisible(true);
          }}>
          <Text style={{color: '#242424', fontSize: 14 * height_ratio}}>
            삭제
          </Text>
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={styles.pageContainer}>
      <RecordDeleteModal
        isRecordDeleteModalVisible={isRecordDeleteModalVisible}
        setIsRecordDeleteModalVisible={setIsRecordDeleteModalVisible}
        record_id={route.params.record.record_id}
        handleCancelPress={handleCancelPress}
        handleDeletePress={handleDeletePress}></RecordDeleteModal>
    </View>
  );
};

export default RecordDetail;
