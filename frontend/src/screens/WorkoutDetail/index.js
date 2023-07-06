import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  Modal,
} from 'react-native';
import Timer from 'react-native-vector-icons/MaterialCommunityIcons';
import Lightning from 'react-native-vector-icons/MaterialCommunityIcons';
import Fire from 'react-native-vector-icons/MaterialCommunityIcons';
import Start from 'react-native-vector-icons/AntDesign';
import Body from 'react-native-vector-icons/Ionicons';
import Square from 'react-native-vector-icons/FontAwesome';
import TutTimer from 'react-native-vector-icons/MaterialCommunityIcons';
import Back from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import {serverAxios} from '../../utils/commonAxios';
import RecordItem from '../../components/RecordItem';
import CustomButton_B from '../../components/CustomButton_B';
import CustomButton_W from '../../components/CustomButton_W';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

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
      headerTitle: () => (
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: '700',
            }}>
            {route.params.title}
          </Text>
          <Text>
            {route.params.start_time} - {route.params.end_time}
          </Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setIsWorkoutDeleteModalVisible(true);
          }}>
          <Text style={{color: '#242424'}}>기록삭제</Text>
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
                <Text>운동 기록을 삭제하시겠습니까?</Text>
                <Text>삭제 후에는 복구할 수 없습니다.</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton_W
                width={126 * width_ratio}
                onPress={() => {
                  setIsWorkoutDeleteModalVisible(false);
                }}
                content="취소"></CustomButton_W>
              <CustomButton_B
                width={126 * width_ratio}
                onPress={() => {
                  deleteRecord();
                }}
                content="삭제"></CustomButton_B>
            </View>
          </View>
        </View>
      </Modal>
      <Text style={styles.yoyakText}>운동 요약</Text>
      <View style={{marginTop: 24 * height_ratio}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.grayCircle}>
            <Body name="body" color="#3aa84c" size={23}></Body>
          </View>

          <View style={{marginLeft: 8 * width_ratio}}>
            <Text style={styles.puaseSubtitle}>운동 부위</Text>
            <Text style={styles.pauseMotionTitle}>
              {route.params.targets.join(', ')}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20 * height_ratio,
            justifyContent: 'flex-start',
          }}>
          <View style={{flexDirection: 'row', width: 145 * width_ratio}}>
            <View style={styles.grayCircle}>
              <Timer name="timer" color="#41b1ca" size={23}></Timer>
            </View>
            <View style={{marginLeft: 8 * width_ratio}}>
              <Text style={styles.puaseSubtitle}>전체 운동시간</Text>
              <Text style={styles.puaseSubcontent}>
                {route.params.total_time}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.RgrayCircle}>
              <Timer name="timer" color="#9f76e1" size={23}></Timer>
            </View>

            <View style={{marginLeft: 8 * width_ratio}}>
              <Text style={styles.puaseSubtitle}>유효 수행시간</Text>
              <Text style={styles.puaseSubcontent}>tut</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20 * height_ratio,
            justifyContent: 'flex-start',
          }}>
          <View style={{flexDirection: 'row', width: 145 * width_ratio}}>
            <View style={styles.grayCircle}>
              <Lightning
                name="lightning-bolt"
                color="#fbcb22"
                size={23}></Lightning>
            </View>
            <View style={{marginLeft: 8 * width_ratio}}>
              <Text style={styles.puaseSubtitle}>볼륨</Text>
              <Text style={styles.puaseSubcontent}>
                {route.params.total_weight}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.RgrayCircle}>
              <Fire name="fire" color="#fc7d36" size={23}></Fire>
            </View>

            <View style={{marginLeft: 8 * width_ratio}}>
              <Text style={styles.puaseSubtitle}>칼로리</Text>
              <Text style={styles.puaseSubcontent}>10000</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={styles.memoContainer}>
          <Text>{route.params.memo}</Text>
        </View>
      </View>
      <View style={{marginTop: 40 * height_ratio, alignSelf: 'stretch'}}>
        <Text style={styles.yoyakText}>운동 상세</Text>
        <ScrollView>
          {workoutList &&
            workoutList.map((value, key) => (
              <RecordItem key={key} record={value}></RecordItem>
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default WorkoutDetail;
