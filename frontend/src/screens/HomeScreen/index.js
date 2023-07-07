import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Setting from 'react-native-vector-icons/Ionicons';
import Board from 'react-native-vector-icons/MaterialCommunityIcons';
import Dumbbell from 'react-native-vector-icons/FontAwesome5';
import CustomButton_B from '../../components/CustomButton_B';
import RecentExercise from '../../components/RecentExercise';
import RoutineBox from '../../components/Routine';
import styles from './styles';
import {serverAxios} from '../../utils/commonAxios';
import {useAppSelector} from '../../redux/store';
import {AppContext} from '../../contexts/AppProvider';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const HomeScreen = ({navigation}) => {
  const appcontext = useContext(AppContext);
  const connectedDevice = useAppSelector(state => state.ble.connectedDevice);
  const [existRoutine, setExistRoutine] = useState(false);
  const [isExercised, setIsExercised] = useState(true);
  const [routine, setRoutine] = useState([]);
  const [recentRoutine, setRecentRoutine] = useState([]);
  const [recentDay, setRecentDay] = useState('');
  const [isExercise, setIsExercise] = useState(true);
  const [isRecord, setIsRecord] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [routineId, setRoutineId] = useState();
  const [routineReady, setRoutineReady] = useState(false);

  useEffect(() => {
    if (routineId) {
      navigation.navigate('AddRoutine', {
        isMotionAdded: false,
        routineName: '새로운 루틴',
        routine_id: routineId,
      });
    }
  }, [routineId]);

  const handleMakeRoutinePress = async () => {
    const body = {
      user_id: 'user1',
    };
    await serverAxios
      .post('/routine', body)
      .then(res => {
        setRoutineId(res.data.routine_id);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getMyRoutine();
    getRecentWorkout();
  }, []);

  const getMyRoutine = async () => {
    setRoutine([]);
    const body = {
      user_id: 'user1',
      isHome: false,
    };
    await serverAxios.post('/routine/load', body).then(res => {
      res.data.map((value, key) => {
        if (res.data.length === 0) setExistRoutine(false);
        else setExistRoutine(true);
        setRoutine(currentRoutine => [
          ...currentRoutine,
          {
            routine_id: value.routine_id,
            routine_name: value.routine_name,
            major_targets: value.major_targets,
            motion_count: value.motion_count,
          },
        ]);
      });
      setRoutineReady(true);
    });
  };

  const getRecentWorkout = async () => {
    const body = {
      user_id: 'user1',
    };
    await serverAxios
      .post('/workout/brief/recent', body)
      .then(res => {
        setRecentRoutine(res.data);
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    if (recentRoutine.length > 0) {
      const start_arr = recentRoutine[0].start_time.split(' ');
      setRecentDay(start_arr[0]);
    }
  }, [recentRoutine]);

  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView style={{marginVertical: 16 * height_ratio}}>
        {!connectedDevice && (
          <View style={styles.connectedContainer}>
            <Text style={styles.noConnectionText}>연결된 기기 없음</Text>
            <Text style={styles.noConnectionText2}>
              Roomfit 기기를 연결해주세요.
            </Text>
            <CustomButton_B
              style={styles.connectButton}
              content="기기 연결"
              disabled={false}
              width={326 * width_ratio}
              onPress={() =>
                navigation.navigate('ConnectDevice')
              }></CustomButton_B>
          </View>
        )}
        {connectedDevice && (
          <View style={{alignItems: 'center'}}>
            <CustomButton_B
              style={styles.connectButton}
              content="빠른 운동 시작"
              disabled={false}
              width={326 * width_ratio}
              onPress={() =>
                navigation.navigate('AddMotion', {isRoutine: false})
              }></CustomButton_B>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.subtitleText}>내 루틴</Text>
          <TouchableOpacity
            style={styles.allRoutine}
            onPress={() => navigation.navigate('MyRoutine')}>
            <Text style={{fontSize: 14 * height_ratio}}>전체보기</Text>
          </TouchableOpacity>
        </View>

        {!existRoutine && routineReady && (
          <View style={styles.routineContainer}>
            <Text style={styles.noRoutineText}>생성된 루틴이 없습니다.</Text>
            <Text style={styles.noConnectionText2}>
              루틴을 정해서 나만의 운동 패턴을 만들어보세요!
            </Text>
            <TouchableOpacity
              style={styles.makeRoutineButton}
              onPress={handleMakeRoutinePress}>
              <Text style={{fontSize: 14 * height_ratio}}>루틴 만들기</Text>
            </TouchableOpacity>
          </View>
        )}
        {routine[0] && routineReady && (
          <View>
            <RoutineBox
              title={routine[0].routine_name}
              targets={routine[0].major_targets}
              numEx={routine[0].motion_count}
              onPress={() => {
                navigation.push('RoutineDetail', {
                  isRoutineDetail: true,
                  routine_id: routine[0].routine_id,
                  routineName: routine[0].routine_name,
                });
              }}></RoutineBox>
            {routine[1] && (
              <RoutineBox
                title={routine[1].routine_name}
                targets={routine[1].major_targets}
                numEx={routine[1].motion_count}
                onPress={() => {
                  navigation.push('RoutineDetail', {
                    isRoutineDetail: true,
                    routine_id: routine[1].routine_id,
                    routineName: routine[1].routine_name,
                  });
                }}></RoutineBox>
            )}
          </View>
        )}

        <Text style={styles.subtitleText}>최근 수행한 운동</Text>
        {recentRoutine.length === 0 && (
          <View style={styles.routineContainer}>
            <Text style={styles.noRoutineText}>
              최근 운동한 기록이 없습니다.
            </Text>
          </View>
        )}
        {recentRoutine.length > 0 && (
          <View>
            <View>
              <Text
                style={{
                  fontSize: 14 * height_ratio,
                  marginTop: 12 * height_ratio,
                }}>
                {recentRoutine[0].start_time.split(' ')[0]}
              </Text>
              {recentRoutine.map((value, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() =>
                    navigation.navigate('WorkoutDetail', {
                      workout_id: value.workout_id,
                      title: value.title,
                      start_time:
                        value.start_time.split(' ')[1].split(':')[0] +
                        ':' +
                        value.start_time.split(' ')[1].split(':')[0],
                      end_time:
                        value.end_time.split(' ')[1].split(':')[0] +
                        ':' +
                        value.end_time.split(' ')[1].split(':')[0],
                      targets: value.targets,
                      total_time: value.total_time,
                      total_weight: value.total_weight,
                      memo: value.memo,
                      startingPoint: 0,
                      isHomeScreen: true,
                    })
                  }>
                  <RecentExercise data={value}></RecentExercise>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{height: 90 * height_ratio}}></View>
          </View>
        )}
      </ScrollView>
      <View style={styles.navigator}>
        <TouchableOpacity style={{marginLeft: 45 * width_ratio}}>
          <Dumbbell
            name="dumbbell"
            size={20 * height_ratio}
            color={isExercise ? '#fff' : '#dfdfdf'}></Dumbbell>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('WorkoutRecord', {isCalendar: false})
          }>
          <Board
            name="clipboard-check"
            size={20 * height_ratio}
            color={isRecord ? '#fff' : '#dfdfdf'}></Board>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginRight: 45 * width_ratio}}
          onPress={() => navigation.navigate('MainSetting')}>
          <Setting
            name="settings"
            size={20 * height_ratio}
            color={isSetting ? '#fff' : '#dfdfdf'}></Setting>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
