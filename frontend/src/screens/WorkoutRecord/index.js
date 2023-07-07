import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';
import styles from './styles';
import {serverAxios} from '../../utils/commonAxios';
import {Calendar} from 'react-native-calendars';
import {WithLocalSvg} from 'react-native-svg';
import TempPeople from '../../assets/images/img_sample1.svg';
import Profile from '../../assets/images/normalProfile.svg';
import moment from 'moment';
import Setting from 'react-native-vector-icons/Ionicons';
import Board from 'react-native-vector-icons/MaterialCommunityIcons';
import Timer from 'react-native-vector-icons/MaterialCommunityIcons';
import Lightning from 'react-native-vector-icons/MaterialCommunityIcons';
import Fire from 'react-native-vector-icons/MaterialCommunityIcons';
import Body from 'react-native-vector-icons/Ionicons';
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
  const [period, setPeriod] = useState(7);

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
      {isLeft && (
        <View style={{alignItems: 'center'}}>
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
                selectedDate ===
                  selectedWorkout[0].start_time.split(' ')[0] && (
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
        </View>
      )}
      {!isLeft && (
        <SafeAreaView>
          <ScrollView>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: 100,
                  backgroundColor: '#f5f5f5',
                  width: 312,
                  height: 40,
                  marginTop: 24,
                }}>
                <TouchableOpacity onPress={() => setPeriod(7)}>
                  <View
                    style={{
                      backgroundColor: period === 7 ? '#fff' : '#f5f5f',
                      borderRadius: 100,
                      width: 43 * width_ratio,
                      height: 32 * height_ratio,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 4 * width_ratio,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: period === 7 ? '#242424' : '#808080',
                      }}>
                      1주
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPeriod(30)}>
                  <View
                    style={{
                      backgroundColor: period === 30 ? '#fff' : '#f5f5f',
                      borderRadius: 100,
                      width: 43 * width_ratio,
                      height: 32 * height_ratio,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: period === 30 ? '#242424' : '#808080',
                      }}>
                      1개월
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPeriod(90)}>
                  <View
                    style={{
                      backgroundColor: period === 90 ? '#fff' : '#f5f5f',
                      borderRadius: 100,
                      width: 43 * width_ratio,
                      height: 32 * height_ratio,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: period === 90 ? '#242424' : '#808080',
                      }}>
                      3개월
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPeriod(180)}>
                  <View
                    style={{
                      backgroundColor: period === 180 ? '#fff' : '#f5f5f',
                      borderRadius: 100,
                      width: 43 * width_ratio,
                      height: 32 * height_ratio,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: period === 180 ? '#242424' : '#808080',
                      }}>
                      6개월
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPeriod(365)}>
                  <View
                    style={{
                      backgroundColor: period === 365 ? '#fff' : '#f5f5f5',
                      borderRadius: 100,
                      width: 43 * width_ratio,
                      height: 32 * height_ratio,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: period === 365 ? '#242424' : '#808080',
                      }}>
                      1년
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsCalendar(1000)}>
                  <View
                    style={{
                      backgroundColor: period === 1000 ? '#fff' : '#f5f5f',
                      borderRadius: 100,
                      width: 43 * width_ratio,
                      height: 32 * height_ratio,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 4 * width_ratio,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: period === 1000 ? '#242424' : '#808080',
                      }}>
                      전체
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{height: 16}}></View>
              <View style={{alignItems: 'center'}}>
                <WithLocalSvg
                  width={200 * width_ratio}
                  height={200 * height_ratio}
                  asset={TempPeople}></WithLocalSvg>
                <View style={{flexDirection: 'row', gap: 24 * height_ratio}}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.targetText}>가슴</Text>
                    <Text style={styles.percentText}>35%</Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.targetText}>어깨</Text>
                    <Text style={styles.percentText}>25%</Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.targetText}>하체</Text>
                    <Text style={styles.percentText}>22%</Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.targetText}>등</Text>
                    <Text style={styles.percentText}>10%</Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.targetText}>코어</Text>
                    <Text style={styles.percentText}>8%</Text>
                  </View>
                </View>
              </View>
              <Image
                source={require('../../assets/images/devider.png')}
                style={{
                  width: 390 * width_ratio,
                  height: 8 * height_ratio,
                  marginBottom: 24 * height_ratio,
                  marginTop: 16 * height_ratio,
                }}></Image>
              <Text style={styles.yoyakText}>운동 통계</Text>
              <View style={{marginTop: 24 * height_ratio}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}>
                  <View
                    style={{flexDirection: 'row', width: 145 * width_ratio}}>
                    <View style={styles.grayCircle}>
                      <Timer name="timer" color="#41b1ca" size={23}></Timer>
                    </View>
                    <View style={{marginLeft: 8 * width_ratio}}>
                      <Text style={styles.puaseSubtitle}>
                        누적 전체 운동시간
                      </Text>
                      <Text style={styles.puaseSubcontent}>sss</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.RgrayCircle}>
                      <Timer name="timer" color="#9f76e1" size={23}></Timer>
                    </View>

                    <View style={{marginLeft: 8 * width_ratio}}>
                      <Text style={styles.puaseSubtitle}>
                        누적 유효 수행시간
                      </Text>
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
                  <View
                    style={{flexDirection: 'row', width: 145 * width_ratio}}>
                    <View style={styles.grayCircle}>
                      <Lightning
                        name="lightning-bolt"
                        color="#fbcb22"
                        size={23}></Lightning>
                    </View>
                    <View style={{marginLeft: 8 * width_ratio}}>
                      <Text style={styles.puaseSubtitle}>볼륨</Text>
                      <Text style={styles.puaseSubcontent}>sss</Text>
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
                <View
                  style={{flexDirection: 'row', marginTop: 24 * height_ratio}}>
                  <View style={styles.grayCircle}>
                    <Body name="body" color="#3aa84c" size={23}></Body>
                  </View>

                  <View style={{marginLeft: 8 * width_ratio}}>
                    <Text style={styles.puaseSubtitle}>운동 횟수</Text>
                    <Text style={styles.pauseMotionTitle}>sss</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
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
