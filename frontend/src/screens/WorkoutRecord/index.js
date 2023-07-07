import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import styles from './styles';
import {serverAxios} from '../../utils/commonAxios';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import Setting from 'react-native-vector-icons/Ionicons';
import Board from 'react-native-vector-icons/MaterialCommunityIcons';
import Dumbbell from 'react-native-vector-icons/FontAwesome5';
import RecentExercise from '../../components/RecentExercise';
import {AppContext} from '../../contexts/AppProvider';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const WorkoutRecord = ({navigation, route}) => {
  const appcontext = useContext(AppContext);
  const [isExercise, setIsExercise] = useState(false);
  const [isRecord, setIsRecord] = useState(true);
  const [isSetting, setIsSetting] = useState(false);
  const [isLeft, setIsLeft] = useState(true);
  const [isCalendar, setIsCalendar] = useState(route.params.isCalendar);
  const [recentRoutine, setRecentRoutine] = useState([]);
  const [workoutList, setWorkoutList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    route.params.selectedDate ? route.params.selectedDate : null,
  );
  const [selectedMonth, setSelectedMonth] = useState(
    moment().format('YYYY-MM'),
  );
  const [workedDay, setworkedDay] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedWorkout, setSelectedWorkout] = useState([]);

  const markDates = () => {
    const updateMarkedDates = {};

    workedDay.forEach(date => {
      updateMarkedDates[date.start_time.split(' ')[0]] = {
        marked: true,
        dotColor: '#5252fa',
      };
    });

    setMarkedDates(updateMarkedDates);
  };

  useEffect(() => {
    getBreifWorkout();
    getMonthWorkoutDay();
  }, []);

  const getBreifWorkout = async () => {
    const body = {
      user_id: 'user1',
    };
    await serverAxios
      .post('/workout/brief', body)
      .then(res => {
        setWorkoutList(res.data);
      })
      .catch(e => console.log(e));
  };

  const groupDataByDate = () => {
    const groupedData = workoutList.reduce((acc, exercise) => {
      const {date, ...exerciseInfo} = exercise;
      if (!acc[date.split(' ')[0]]) {
        acc[date] = [];
      }
      acc[date].push(exerciseInfo);
      return acc;
    }, {});

    return Object.keys(groupedData).map(date => ({
      date,
      data: groupedData[date],
    }));
  };

  const formattedData = groupDataByDate();

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
  };

  const handleMonthChange = (year, month) => {
    const formattedMonth = String(month).padStart(2, '0');
    const yearMonth = `${year}-${formattedMonth}`;
    setSelectedMonth(yearMonth);
  };

  useEffect(() => {
    getMonthWorkoutDay();
  }, [selectedMonth]);

  useEffect(() => {
    getDaybreifWorkout();
  }, [selectedDate]);

  getDaybreifWorkout = async () => {
    const body = {
      user_id: 'user1',
      date: selectedDate,
    };
    await serverAxios.post('workout/calender/date', body).then(res => {
      setSelectedWorkout(res.data);
    });
  };

  getMonthWorkoutDay = async () => {
    const body = {
      user_id: 'user1', //Appcontext.state.userid
      month: selectedMonth,
    };
    await serverAxios
      .post('/workout/calender/month', body)
      .then(res => {
        setworkedDay(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    markDates();
  }, [workedDay]);

  return (
    <View style={styles.pageContainer}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => setIsLeft(true)}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            wdith: 179,
            height: 50,
            borderBottomColor: isLeft ? '#242424' : '#f5f5f5',
            borderBottomWidth: 2,
          }}>
          <Text
            style={{
              fontWeight: isLeft ? '700' : '400',
              fontSize: 16,
              color: isLeft ? '#242424' : '#808080',
            }}>
            운동추세
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsLeft(false)}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: 179,
            height: 50,
            borderBottomColor: isLeft ? '#f5f5f5' : '#242424',
            borderBottomWidth: 2,
          }}>
          <Text
            style={{
              fontWeight: isLeft ? '400' : '700',
              fontSize: 16,
              color: isLeft ? '#808080' : '#242424',
            }}>
            통계
          </Text>
        </TouchableOpacity>
      </View>
      {/* {isLeft ? (
        <Image source={require('../../assets/images/line.png')}></Image>
      ) : (
        <Image source={require('../../assets/images/line2.png')}></Image>
      )} */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          backgroundColor: '#f5f5f5',
          width: 156,
          height: 40,
          marginTop: 24,
        }}>
        <View
          style={{
            backgroundColor: isCalendar ? '#f5f5f5' : '#fff',
            borderRadius: 100,
            width: 73,
            height: 32,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => setIsCalendar(false)}>
            <Text
              style={{
                fontSize: 14,
                color: isCalendar ? '#808080' : '#242424',
              }}>
              운동기록
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: isCalendar ? '#fff' : '#f5f5f5',
            borderRadius: 100,
            width: 73,
            height: 32,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => setIsCalendar(true)}>
            <Text
              style={{
                fontSize: 14,
                color: isCalendar ? '#242424' : '#808080',
              }}>
              캘린더
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{height: 16}}></View>
      {!isCalendar && (
        <ScrollView>
          {workoutList.length > 0 &&
            formattedData.map(value => (
              <View key={value.date} style={{marginBottom: 40}}>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: '#242424',
                    }}>
                    {value.date}
                  </Text>
                  {value.data.map((values, keys) => (
                    <TouchableOpacity
                      key={keys}
                      onPress={() =>
                        navigation.navigate('WorkoutDetail', {
                          startingPoint: 1,
                          selectedDate: selectedDate,
                          workout_id: values.workout_id,
                          title: values.title,
                          start_time:
                            values.start_time.split(' ')[1].split(':')[0] +
                            ':' +
                            values.start_time.split(' ')[1].split(':')[0],
                          end_time:
                            values.end_time.split(' ')[1].split(':')[0] +
                            ':' +
                            values.end_time.split(' ')[1].split(':')[0],
                          targets: values.targets,
                          total_time: values.total_time,
                          total_weight: values.total_weight,
                          memo: values.memo,
                          isHomeScreen: false,
                        })
                      }>
                      <RecentExercise data={values}></RecentExercise>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          <View style={{height: 50}}></View>
        </ScrollView>
      )}
      {isCalendar && (
        <ScrollView>
          <View>
            <Calendar
              style={styles.Calendar}
              monthFormat={'yyyy.M'}
              onMonthChange={month =>
                handleMonthChange(month.year, month.month)
              }
              theme={{
                todayTextColor: '#5252fa',
                selectedDayBackgroundColor: '#5252fa',
                arrowColor: '#5252fa',
              }}
              onDayPress={day => {
                setSelectedDate(day.dateString);
              }}
              markedDates={{
                ...markedDates,
                [selectedDate]: {
                  selected: true,
                  selectedColor: '#5252fa',
                  selectedTextColor: 'white',
                },
              }}></Calendar>
          </View>
          {selectedWorkout.length > 0 &&
            selectedDate === selectedWorkout[0].start_time.split(' ')[0] && (
              <>
                <View>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 16,
                      fontWeight: '700',
                      color: '#242424',
                    }}>
                    {selectedDate}
                  </Text>
                  {selectedWorkout.map((value, key) => (
                    <TouchableOpacity
                      key={key}
                      onPress={() =>
                        navigation.navigate('WorkoutDetail', {
                          startingPoint: 2,
                          selectedDate: selectedDate,
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
                          isHomeScreen: false,
                        })
                      }>
                      <RecentExercise data={value}></RecentExercise>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={{height: 90}}></View>
              </>
            )}
        </ScrollView>
      )}

      <View style={styles.navigator}>
        <TouchableOpacity
          style={{marginLeft: 45 * width_ratio}}
          onPress={() => navigation.reset({routes: [{name: 'HomeScreen'}]})}>
          <Dumbbell name="dumbbell" size={20} color={'#dfdfdf'}></Dumbbell>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('WorkoutRecord')}>
          <Board name="clipboard-check" size={20} color={'#fff'}></Board>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginRight: 45 * width_ratio}}
          onPress={() => navigation.navigate('MainSetting')}>
          <Setting name="settings" size={20} color={'#dfdfdf'}></Setting>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkoutRecord;
