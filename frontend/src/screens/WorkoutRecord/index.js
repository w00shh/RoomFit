import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import styles from './styles';
import {serverAxios} from '../../utils/commonAxios';
import {Calendar} from 'react-native-calendars';
import DropDownPicker from 'react-native-dropdown-picker';
import {SelectList} from 'react-native-dropdown-select-list';

import TempPeople from '../../assets/images/img_sample1.svg';
import Profile from '../../assets/images/normalProfile.svg';
import moment from 'moment';
import Timer from 'react-native-vector-icons/MaterialCommunityIcons';
import Lightning from 'react-native-vector-icons/MaterialCommunityIcons';
import Fire from 'react-native-vector-icons/MaterialCommunityIcons';
import Body from 'react-native-vector-icons/Ionicons';
import RecentExercise from '../../components/RecentExercise';
import {AppContext} from '../../contexts/AppProvider';
import Sample from '../../assets/svg/img_sample1.svg';

//svg
import Workout from '../../assets/svg/buttons/default/workout.svg';
import History from '../../assets/svg/buttons/active/history.svg';
import Setting from '../../assets/svg/buttons/default/setting.svg';

import Time from '../../assets/svg/icons/time.svg';
import Tut from '../../assets/svg/icons/tut.svg';
import Volume from '../../assets/svg/icons/volume.svg';
import Calorie from '../../assets/svg/icons/calorie.svg';
import ICalendar from '../../assets/svg/icons/calendar.svg';

import Question from '../../assets/svg/buttons/single/question.svg';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const WorkoutRecord = ({navigation, route}) => {
  const appcontext = useContext(AppContext);
  const isRef = useRef(false);
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
  const [periodWorkout, setPeriodWorkout] = useState();
  const [selectedValue, setSelectedValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: '7일', value: '7'},
    {label: '1개월', value: '1'},
    {label: '3개월', value: '3'},
    {label: '6개월', value: '6'},
  ]);

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
    //getBreifWorkout();
    getMonthWorkoutDay();
  }, []);

  const getBreifWorkout = async () => {
    const body = {
      user_id: appcontext.state.userid,
    };
    console.log(body);
    await serverAxios
      .post('/workout/brief', body)
      .then(res => {
        console.log('asd');
        console.log(res.data);
        setWorkoutList(res.data);
      })
      .catch(e => console.log(e));
  };

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
      user_id: appcontext.state.userid,
      date: selectedDate,
    };
    console.log(body.date);
    await serverAxios.post('workout/calender/date', body).then(res => {
      setSelectedWorkout(res.data);
    });
  };

  getMonthWorkoutDay = async () => {
    const body = {
      user_id: appcontext.state.userid, //Appcontext.state.userid
      month: selectedMonth,
    };
    await serverAxios
      .post('/workout/calender/month', body)
      .then(res => {
        // console.log(res.data);
        setworkedDay(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    markDates();
  }, [workedDay]);

  useEffect(() => {
    getPeriodWorkout();

    console.log(period);
  }, [period]);

  const getPeriodWorkout = async () => {
    const body = {
      user_id: appcontext.state.userid,
    };
    console.log(period);
    const url = '/workout/stat/' + period;
    await serverAxios.post(url, body).then(res => {
      //console.log(res.data);
      setPeriodWorkout(res.data);
    });
  };

  useEffect(() => {
    if (isRef.current) {
      appcontext.actions.setDuration(selectedValue);
      handleGetAllWorkoutList(selectedValue);
    } else {
      isRef.current = true;
    }
  }, [selectedValue]);

  const handleGetAllWorkoutList = async period => {
    const body = {
      user_id: appcontext.state.userid,
      duration: period,
    };
    console.log('period: ' + body.duration);
    await serverAxios
      .post('/workout/brief', body)
      .then(res => {
        appcontext.actions.setWorkoutList(groupDataByDate(res.data));
      })
      .catch(e => console.log(e));
  };

  const groupDataByDate = data => {
    const groupedData = data.reduce((acc, exercise) => {
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

  const renderingWorkoutRecord = value => {
    //console.log(appcontext.state.workoutList.length);
    //console.log(value.index);
    return (
      <View
        style={{
          marginBottom:
            value.index === appcontext.state.workoutList.length - 1 ? 300 : 20,
        }}>
        <View>
          <Text
            style={{
              fontSize: 16 * height_ratio,
              fontWeight: '700',
              color: '#242424',
            }}>
            {value.item.date}
          </Text>
          {value.item.data.map((values, keys) => (
            <TouchableOpacity
              key={keys}
              onPress={() =>
                navigation.navigate('WorkoutDetail', {
                  index: value.index,
                  startingPoint: 1,
                  selectedDate: selectedDate,
                  workout_id: values.workout_id,
                  title: values.title,
                  start_time:
                    values.start_time.split(' ')[1].split(':')[0] +
                    ':' +
                    values.start_time.split(' ')[1].split(':')[1],
                  end_time:
                    values.end_time.split(' ')[1].split(':')[0] +
                    ':' +
                    values.end_time.split(' ')[1].split(':')[1],
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
    );
  };

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
            width: 179 * width_ratio,
            height: 50 * height_ratio,
            borderBottomColor: isLeft ? '#242424' : '#f5f5f5',
            borderBottomWidth: 2 * height_ratio,
          }}>
          <Text
            style={{
              fontWeight: isLeft ? '700' : '400',
              fontSize: 16 * height_ratio,
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
            width: 179 * width_ratio,
            height: 50 * height_ratio,
            borderBottomColor: isLeft ? '#f5f5f5' : '#242424',
            borderBottomWidth: 2 * height_ratio,
          }}>
          <Text
            style={{
              fontWeight: isLeft ? '400' : '700',
              fontSize: 16 * height_ratio,
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
            zIndex={100}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 100,
              //backgroundColor: '#f5f5f5',
              width: 358 * width_ratio,
              height: 40 * height_ratio,
              marginTop: 24 * height_ratio,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: 170 * width_ratio,
                height: 40 * height_ratio,
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 8,
                borderColor: '#c0c0c0',
                borderWidth: 1,
                marginBottom: 10,
              }}>
              <View
                style={{
                  backgroundColor: isCalendar ? '#fff' : '#242424',
                  borderWidth: 1,
                  borderColor: '#242424',
                  width: 85 * width_ratio,
                  height: 40 * height_ratio,
                  borderBottomLeftRadius: 8,
                  borderTopLeftRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => setIsCalendar(false)}>
                  <Text
                    style={{
                      fontSize: 14 * height_ratio,
                      color: isCalendar ? '#242424' : 'white',
                    }}>
                    운동기록
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  backgroundColor: isCalendar ? '#242424' : '#fff',
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                  borderWidth: 1,
                  borderColor: '#242424',
                  width: 85 * width_ratio,
                  height: 40 * height_ratio,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => setIsCalendar(true)}>
                  <Text
                    style={{
                      fontSize: 14 * height_ratio,
                      color: isCalendar ? 'white' : '#242424',
                    }}>
                    캘린더
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {!isCalendar && (
              <View>
                <DropDownPicker
                  open={open}
                  value={selectedValue}
                  items={items}
                  setOpen={setOpen}
                  setValue={setSelectedValue}
                  setItems={setItems}
                  placeholder={
                    appcontext.state.duration +
                    (appcontext.state.duration === 7 ? '일' : '개월')
                  }
                  style={[styles.dropdown]}
                />
              </View>
            )}
          </View>

          {/* {open && <View style={{height: 150 * height_ratio}}></View>} */}
          <View>
            <View style={{height: 16 * height_ratio}}></View>
            {!isCalendar && (
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={appcontext.state.workoutList}
                  renderItem={renderingWorkoutRecord}></FlatList>
              </View>
            )}
          </View>
          {isCalendar && (
            <ScrollView
              style={{width: 358 * width_ratio}}
              showsVerticalScrollIndicator={false}>
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
                          marginTop: 10 * height_ratio,
                          fontSize: 16 * height_ratio,
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
                              index: appcontext.state.workoutList.findIndex(
                                e => e.date === selectedDate,
                              ),
                              startingPoint: 2,
                              selectedDate: selectedDate,
                              workout_id: value.workout_id,
                              title: value.title,
                              start_time:
                                value.start_time.split(' ')[1].split(':')[0] +
                                ':' +
                                value.start_time.split(' ')[1].split(':')[1],
                              end_time:
                                value.end_time.split(' ')[1].split(':')[0] +
                                ':' +
                                value.end_time.split(' ')[1].split(':')[1],
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

                    <View style={{height: 150 * height_ratio}}></View>
                  </>
                )}
            </ScrollView>
          )}
        </View>
      )}
      {!isLeft && (
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: 100,
                  backgroundColor: '#f5f5f5',
                  width: 312 * width_ratio,
                  height: 40 * height_ratio,
                  marginTop: 24 * height_ratio,
                }}>
                <TouchableOpacity onPress={() => setPeriod(7)}>
                  <View
                    style={{
                      backgroundColor: period === 7 ? '#fff' : '#f5f5f5',
                      borderRadius: 100,
                      width: 43 * width_ratio,
                      height: 32 * height_ratio,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 4 * width_ratio,
                    }}>
                    <Text
                      style={{
                        fontSize: 14 * height_ratio,
                        color: period === 7 ? '#242424' : '#808080',
                      }}>
                      1주
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPeriod(30)}>
                  <View
                    style={{
                      backgroundColor: period === 30 ? '#fff' : '#f5f5f5',
                      borderRadius: 100,
                      width: 43 * width_ratio,
                      height: 32 * height_ratio,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 14 * height_ratio,
                        color: period === 30 ? '#242424' : '#808080',
                      }}>
                      1개월
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPeriod(90)}>
                  <View
                    style={{
                      backgroundColor: period === 90 ? '#fff' : '#f5f5f5',
                      borderRadius: 100,
                      width: 43 * width_ratio,
                      height: 32 * height_ratio,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 14 * height_ratio,
                        color: period === 90 ? '#242424' : '#808080',
                      }}>
                      3개월
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPeriod(180)}>
                  <View
                    style={{
                      backgroundColor: period === 180 ? '#fff' : '#f5f5f5',
                      borderRadius: 100,
                      width: 43 * width_ratio,
                      height: 32 * height_ratio,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 14 * height_ratio,
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
                        fontSize: 14 * height_ratio,
                        color: period === 365 ? '#242424' : '#808080',
                      }}>
                      1년
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPeriod(1000)}>
                  <View
                    style={{
                      backgroundColor: period === 1000 ? '#fff' : '#f5f5f5',
                      borderRadius: 100,
                      width: 43 * width_ratio,
                      height: 32 * height_ratio,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 4,
                    }}>
                    <Text
                      style={{
                        fontSize: 14 * height_ratio,
                        color: period === 1000 ? '#242424' : '#808080',
                      }}>
                      전체
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{height: 16}}></View>
              <View style={{alignItems: 'center'}}>
                <Sample
                  width={200 * width_ratio}
                  height={200 * height_ratio}></Sample>
                <View style={{flexDirection: 'row', gap: 24 * height_ratio}}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.targetText}>가슴</Text>
                    <Text style={styles.percentText}>
                      {periodWorkout.percentage.chest}%
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.targetText}>어깨</Text>
                    <Text style={styles.percentText}>
                      {periodWorkout.percentage.shoulder}%
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.targetText}>하체</Text>
                    <Text style={styles.percentText}>
                      {periodWorkout.percentage.leg}%
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.targetText}>등</Text>
                    <Text style={styles.percentText}>
                      {periodWorkout.percentage.back}%
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.targetText}>코어</Text>
                    <Text style={styles.percentText}>
                      {periodWorkout.percentage.core}%
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: 8 * height_ratio,
                  width: '100%',

                  backgroundColor: '#F5F5F5',
                  marginTop: 16 * height_ratio,
                  marginBottom: 24 * height_ratio,
                }}
              />
              <Text style={styles.yoyakText}>운동 통계</Text>
              <View
                style={{marginTop: 24 * height_ratio, gap: 24 * height_ratio}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    gap: 11 * width_ratio,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width:
                        (Dimensions.get('screen').width - 32 * width_ratio) /
                          2 -
                        11 * width_ratio,
                      gap: 8 * width_ratio,
                      alignItems: 'center',
                    }}>
                    <View style={styles.grayCircle}>
                      <Time
                        height={24 * height_ratio}
                        width={24 * width_ratio}
                      />
                    </View>
                    <View>
                      <Text style={styles.pauseSubtitle}>누적 운동시간</Text>
                      <Text style={styles.pauseSubcontent}>
                        {periodWorkout.total_time}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 8 * width_ratio,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={styles.RgrayCircle}>
                      <Tut
                        height={24 * height_ratio}
                        width={24 * width_ratio}
                      />
                    </View>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 4 * width_ratio,
                          alignItems: 'center',
                        }}>
                        <Text style={styles.pauseSubtitle}>
                          누적 유효 수행시간
                        </Text>
                        <TouchableOpacity>
                          <Question
                            height={16 * height_ratio}
                            width={16 * width_ratio}
                          />
                        </TouchableOpacity>
                      </View>

                      <Text style={styles.pauseSubcontent}>
                        {periodWorkout.tut}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    gap: 11 * width_ratio,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width:
                        (Dimensions.get('screen').width - 32 * width_ratio) /
                          2 -
                        11 * width_ratio,
                      gap: 8 * width_ratio,
                      alignItems: 'center',
                    }}>
                    <View style={styles.grayCircle}>
                      <Volume
                        height={24 * height_ratio}
                        width={24 * width_ratio}
                      />
                    </View>
                    <View>
                      <Text style={styles.pauseSubtitle}>볼륨</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline',
                          gap: 2 * width_ratio,
                        }}>
                        <Text style={styles.pauseSubcontent}>
                          {periodWorkout.total_weight}
                        </Text>
                        <Text style={{...styles.pauseSubtitle}}>kg</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 8 * width_ratio,
                      alignItems: 'center',
                    }}>
                    <View style={styles.RgrayCircle}>
                      <Calorie
                        height={24 * height_ratio}
                        width={24 * width_ratio}
                      />
                    </View>

                    <View>
                      <Text style={styles.pauseSubtitle}>칼로리</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'baseline',
                          gap: 2 * width_ratio,
                        }}>
                        <Text style={styles.pauseSubcontent}>10000</Text>
                        <Text style={{...styles.pauseSubtitle}}>Kcal</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8 * width_ratio,
                    alignItems: 'center',
                  }}>
                  <View style={styles.grayCircle}>
                    <ICalendar
                      height={24 * height_ratio}
                      width={24 * width_ratio}
                    />
                  </View>

                  <View>
                    <Text style={styles.pauseSubtitle}>운동 횟수</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'baseline',
                        gap: 2 * width_ratio,
                      }}>
                      <Text style={styles.pauseMotionTitle}>
                        {periodWorkout.count}
                      </Text>
                      <Text style={{...styles.pauseSubtitle}}>일</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{height: 150 * height_ratio}}></View>
          </ScrollView>
        </SafeAreaView>
      )}

      <View style={styles.navigator}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Workout height={24 * height_ratio} width={24 * width_ratio} />
        </TouchableOpacity>
        <TouchableOpacity>
          <History height={24 * height_ratio} width={24 * width_ratio} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MainSetting')}>
          <Setting height={24 * height_ratio} width={24 * width_ratio} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkoutRecord;
