import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  Platform,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  Modal,
  Image,
} from 'react-native';
import styles from './styles';
import {serverAxios} from '../../utils/commonAxios';
import RecordItem from '../../components/RecordItem';
import CustomButton_B from '../../components/CustomButton_B';
import CustomButton_W from '../../components/CustomButton_W';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';

//svg
import Back from '../../assets/svg/buttons/single/back.svg';
import Body from '../../assets/svg/icons/body.svg';
import Time from '../../assets/svg/icons/time.svg';
import Tut from '../../assets/svg/icons/tut.svg';
import Calorie from '../../assets/svg/icons/calorie.svg';
import Volume from '../../assets/svg/icons/volume.svg';
import {Divider} from '../../components/divider';
import {AppContext} from '../../contexts/AppProvider';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const WorkoutDetail = ({navigation, route}) => {
  const appcontext = useContext(AppContext);

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

    const updatedArray = [...appcontext.state.workoutList];

    const currentData = updatedArray[route.params.index].data;
    const updatedData = currentData.filter(
      item => item.workout_id !== route.params.workout_id,
    );
    updatedArray[route.params.index].data = updatedData;
    // 배열을 순회하면서 workout_id가 일치하는 데이터를 삭제

    // 변경된 배열을 저장
    appcontext.actions.setWorkoutList(updatedArray);

    console.log(appcontext.state.workoutList);

    if (appcontext.state.workoutList[route.params.index].data.length === 0) {
      let updatedWorkoutList = [...appcontext.state.workoutList];
      updatedWorkoutList = updatedWorkoutList.filter(
        item =>
          item.date !== appcontext.state.workoutList[route.params.index].date,
      );
      appcontext.actions.setWorkoutList(updatedWorkoutList);
    }

    if (route.params.startingPoint === 0) {
      /* StartingPoint가 HomeScreen일 때 */

      console.log('here?');
      navigation.push('HomeScreen');
    } else if (route.params.startingPoint === 1) {
      console.log('workoutRecord');
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

    setIsWorkoutDeleteModalVisible(false);
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

        <View style={{backgroundColor: 'white'}}>
          <Text style={styles.yoyakText}>운동 요약</Text>
          <View
            style={{gap: 24 * height_ratio, marginBottom: 24 * height_ratio}}>
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
                  <Text style={styles.pauseSubcontent}>00:40:12</Text>
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
                  <Text style={styles.pauseSubcontent}>00:24:37</Text>
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
                  <Calorie
                    height={24 * height_ratio}
                    width={24 * width_ratio}
                  />
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
        </View>

        <View style={{alignSelf: 'stretch'}}>
          <Text style={styles.yoyakText}>운동 상세</Text>

          {workoutList &&
            workoutList.map((value, key) => (
              <View key={key}>
                <RecordItem
                  record={value}
                  navigateToRecordDetail={() => {
                    navigation.navigate('RecordDetail', {
                      record: value,
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
                  }}></RecordItem>
                {key !== workoutList.length - 1 && (
                  <Divider height_ratio={height_ratio} />
                )}
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default WorkoutDetail;
