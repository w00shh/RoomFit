import React, {useEffect, useState, useContext} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from './styles';
import {serverAxios} from '../../utils/commonAxios';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import Setting from 'react-native-vector-icons/Ionicons';
import Board from 'react-native-vector-icons/MaterialCommunityIcons';
import Dumbbell from 'react-native-vector-icons/FontAwesome5';
import RecentExercise from '../../components/RecentExercise';
import {AppContext} from '../../contexts/AppProvider';

const WorkoutRecord = ({navigation, route}) => {
  const appcontext = useContext(AppContext);
  const [isExercise, setIsExercise] = useState(false);
  const [isRecord, setIsRecord] = useState(true);
  const [isSetting, setIsSetting] = useState(false);
  const [isLeft, setIsLeft] = useState(true);
  const [isCalender, setIsCalender] = useState(route.params.isCalendar);
  const [recentRoutine, setRecentRoutine] = useState([]);
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
      updateMarkedDates[date.start_time] = {marked: true, dotColor: '#5252fa'};
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
        res.data.map((value, key) => {
          setRecentRoutine(currentRecentRoutine => [
            ...currentRecentRoutine,
            {
              recentInedx: key,
              workout_id: value.workout_id,
              title: value.title,
              date: value.start_time.split(' ')[0],
              start_time:
                value.start_time.split(' ')[1].split(':')[0] +
                ':' +
                value.start_time.split(' ')[1].split(':')[1],
              end_time:
                value.end_time.split(' ')[1].split(':')[0] +
                ':' +
                value.end_time.split(' ')[1].split(':')[1],
              total_time: value.total_time,
              total_weight: value.total_weight,
              targets: value.targets,
              memo: value.memo,
            },
          ]);
        });
      })
      .catch(e => console.log(e));
  };
  useEffect(() => {}, [recentRoutine]);

  const groupDataByDate = () => {
    const groupedData = recentRoutine.reduce((acc, exercise) => {
      const {date, ...exerciseInfo} = exercise;
      if (!acc[date]) {
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
      res.data.map((value, key) => {
        setSelectedWorkout(currentSelectedWorkout => [
          ...currentSelectedWorkout,
          {
            workout_id: value.workout_id,
            title: value.title,
            date: value.start_time.split(' ')[0],
            start_time:
              value.start_time.split(' ')[1].split(':')[0] +
              ':' +
              value.start_time.split(' ')[1].split(':')[1],
            end_time:
              value.end_time.split(' ')[1].split(':')[0] +
              ':' +
              value.end_time.split(' ')[1].split(':')[1],
            total_time: value.total_time,
            total_weight: value.total_weight,
            targets: value.targets,
            memo: value.memo,
          },
        ]);
      });
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
        setworkedDay([]);
        res.data.map((value, key) => {
          setworkedDay(currentWorkedDay => [
            ...currentWorkedDay,
            {
              start_time: value.start_time.split(' ')[0],
            },
          ]);
        });
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
            backgroundColor: isCalender ? '#f5f5f5' : '#fff',
            borderRadius: 100,
            width: 73,
            height: 32,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => setIsCalender(false)}>
            <Text
              style={{
                fontSize: 14,
                color: isCalender ? '#808080' : '#242424',
              }}>
              운동기록
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: isCalender ? '#fff' : '#f5f5f5',
            borderRadius: 100,
            width: 73,
            height: 32,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => setIsCalender(true)}>
            <Text
              style={{
                fontSize: 14,
                color: isCalender ? '#242424' : '#808080',
              }}>
              캘린더
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {!isCalender && (
        <ScrollView>
          {recentRoutine.length > 0 &&
            formattedData.map(value => (
              <View key={value.date}>
                <View>
                  <Text
                    style={{
                      marginTop: 20,
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
                          start_time: values.start_time,
                          end_time: values.end_time,
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
          <View style={{height: 90}}></View>
        </ScrollView>
      )}
      {isCalender && (
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
            selectedDate === selectedWorkout[0].date && (
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
                          start_time: value.start_time,
                          end_time: value.end_time,
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
          style={{marginLeft: 45}}
          onPress={() => navigation.reset({routes: [{name: 'HomeScreen'}]})}>
          <Dumbbell name="dumbbell" size={20} color={'#dfdfdf'}></Dumbbell>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('WorkoutRecord')}>
          <Board name="clipboard-check" size={20} color={'#fff'}></Board>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginRight: 45}}
          onPress={() => navigation.navigate('MainSetting')}>
          <Setting name="settings" size={20} color={'#dfdfdf'}></Setting>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkoutRecord;
