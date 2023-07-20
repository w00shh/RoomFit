import React, {useEffect, useState} from 'react';
import {
  Platform,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  Modal,
} from 'react-native';
import styles from './styles';
import {serverAxios} from '../../utils/commonAxios';
import RecordItem from '../../components/RecordItem';
import CustomButton_B from '../../components/CustomButton_B';
import CustomButton_W from '../../components/CustomButton_W';

//svg
import Back from '../../assets/svg/buttons/single/back.svg';
import Body from '../../assets/svg/icons/body.svg';
import Time from '../../assets/svg/icons/time.svg';
import Tut from '../../assets/svg/icons/tut.svg';
import Calorie from '../../assets/svg/icons/calorie.svg';
import Volume from '../../assets/svg/icons/volume.svg';
import {Divider} from '../../components/divider';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const WorkoutDetail = ({navigation, route}) => {
  const [isWorkoutDeleteModalVisible, setIsWorkoutDeleteModalVisible] =
    useState(false);
  const [workoutList, setWorkoutList] = useState();
  const getWorkoutDetail = async () => {
    const targetUrl = '/workout/detail/' + route.params.workout_id;
    await serverAxios
      .get(targetUrl)
      .then(res => {
        setWorkoutList(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Back height={24 * height_ratio} width={24 * width_ratio}></Back>
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 16 * height_ratio,
              fontWeight: '700',
            }}>
            {route.params.title}
          </Text>
          <Text style={{fontSize: 14 * height_ratio}}>
            {route.params.start_time} - {route.params.end_time}
          </Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setIsWorkoutDeleteModalVisible(true);
          }}>
          <Text style={{color: '#242424', fontSize: 14 * height_ratio}}>
            기록삭제
          </Text>
        </TouchableOpacity>
      ),
    });
    getWorkoutDetail();
  }, []);

  const deleteRecord = async () => {
    const delUrl = '/workout/delete/' + route.params.workout_id;
    await serverAxios
      .delete(delUrl)
      .then(res => {})
      .catch(e => {
        console.log(e);
      });

    if (route.params.startingPoint == 0) {
      /* StartingPoint가 HomeScreen일 때 */
      navigation.reset({routes: [{name: 'HomeScreen'}]});
    } else if (route.params.startingPoint == 1) {
      /* StartingPoint가 WorkoutRecord의 운동기록 탭일 때 */
      navigation.push('WorkoutRecord', {
        isCalendar: false,
        selectedDate: route.params.selectedDate,
      });
    } else {
      /* StartingPoint가 WorkoutRecord의 캘린더 탭일 때 */
      navigation.push('WorkoutRecord', {
        isCalendar: true,
        selectedDate: route.params.selectedDate,
      });
    }
  };
  return (
    <View style={styles.pageContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Modal
          visible={isWorkoutDeleteModalVisible}
          transparent={true}
          animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.workoutDeleteContainer}>
              <View style={styles.modalTopContainer}></View>
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>운동 기록 삭제</Text>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionText}>
                    운동 기록을 삭제하시겠습니까?
                  </Text>
                  <Text style={styles.descriptionText}>
                    삭제 후에는 복구할 수 없습니다.
                  </Text>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <CustomButton_W
                  width={126 * width_ratio}
                  marginVertical={0}
                  onPress={() => {
                    setIsWorkoutDeleteModalVisible(false);
                  }}
                  content="취소"></CustomButton_W>
                <CustomButton_B
                  width={126 * width_ratio}
                  marginVertical={0}
                  onPress={() => {
                    deleteRecord();
                  }}
                  content="삭제"></CustomButton_B>
              </View>
            </View>
          </View>
        </Modal>
        <Text style={styles.yoyakText}>운동 요약</Text>
        <View style={{gap: 24 * height_ratio, marginBottom: 24 * height_ratio}}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.grayCircle}>
              <Body height={24 * height_ratio} width={24 * width_ratio} />
            </View>

            <View style={{marginLeft: 8 * width_ratio}}>
              <Text style={styles.pauseSubtitle}>운동 부위</Text>
              <Text style={styles.pauseMotionTitle}>
                {route.params.targets.join(', ')}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 11 * width_ratio,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width:
                  (Dimensions.get('screen').width - 32 * width_ratio) / 2 -
                  11 * width_ratio,
                gap: 8 * width_ratio,
                alignItems: 'center',
              }}>
              <View style={styles.grayCircle}>
                <Time height={24 * height_ratio} width={24 * width_ratio} />
              </View>
              <View>
                <Text style={styles.pauseSubtitle}>전체 운동시간</Text>
                <Text style={styles.pauseSubcontent}>
                  {route.params.total_time}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 8 * width_ratio,
                alignItems: 'center',
              }}>
              <View style={styles.grayCircle}>
                <Tut height={24 * height_ratio} width={24 * width_ratio} />
              </View>

              <View>
                <Text style={styles.pauseSubtitle}>유효 수행시간</Text>
                <Text style={styles.pauseSubcontent}>tut</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 11 * width_ratio,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width:
                  (Dimensions.get('screen').width - 32 * width_ratio) / 2 -
                  11 * width_ratio,
                gap: 8 * width_ratio,
                alignItems: 'center',
              }}>
              <View style={styles.grayCircle}>
                <Volume height={24 * height_ratio} width={24 * width_ratio} />
              </View>
              <View>
                <Text style={styles.pauseSubtitle}>볼륨</Text>
                <Text style={styles.pauseSubcontent}>
                  {route.params.total_weight}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 8 * width_ratio,
                alignItems: 'center',
              }}>
              <View style={styles.grayCircle}>
                <Calorie height={24 * height_ratio} width={24 * width_ratio} />
              </View>

              <View>
                <Text style={styles.pauseSubtitle}>칼로리</Text>
                <Text style={styles.pauseSubcontent}>10000</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{alignItems: 'center', marginBottom: 40 * height_ratio}}>
          <View style={styles.memoContainer}>
            {route.params.memo.length > 0 ? (
              <Text style={{fontSize: 14 * height_ratio}}>
                {route.params.memo}
              </Text>
            ) : (
              <Text style={{fontSize: 14 * height_ratio}}>
                작성하신 메모가 없습니다.
              </Text>
            )}
          </View>
        </View>

        <View style={{alignSelf: 'stretch'}}>
          <Text style={styles.yoyakText}>운동 상세</Text>
          {workoutList &&
            workoutList.map((value, key) => (
              <>
                <RecordItem
                  key={key}
                  record={value}
                  navigateToHistoryDetail={() => {
                    navigation.navigate('HistoryDetail', {record: value});
                  }}></RecordItem>
                {key !== workoutList.length - 1 && (
                  <Divider height_ratio={height_ratio} />
                )}
              </>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default WorkoutDetail;
