import React, {useState, useEffect, useId} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Reload from 'react-native-vector-icons/AntDesign';
import Setting from 'react-native-vector-icons/Ionicons';
import Board from 'react-native-vector-icons/MaterialCommunityIcons';
import Dumbbell from 'react-native-vector-icons/FontAwesome5';
import CustomButton_B from '../../components/CustomButton_B';
import RecentExercise from '../../components/RecentExercise';
import RoutineBox from '../../components/Routine';
import styles from './styles';

const HomeScreen = ({navigation}) => {
  const [isConnected, setIsConnected] = useState(true);
  const [existRoutine, setExistRoutine] = useState(true);
  const [isExercised, setIsExercised] = useState(true);

  const [isExercise, setIsExercise] = useState(true);
  const [isRecord, setIsRecord] = useState(false);
  const [isSetting, setIsSetting] = useState(false);

  const ROUNTINE = [
    {
      title: '상체 뽀개기',
      target: ['가슴', '어깨', '이두', '삼두'],
      numEx: '4개의 운동',
    },
    {
      title: '하체 위주',
      target: ['하체'],
      numEx: '1개의 운동',
    },
  ];

  const PERFORMED = [
    {
      date: '2023.06.01',
      data: [
        {
          title: '상체 뽀개기',
          target: ['어깨', '어깨', '이두', '삼두'],
          time: ['오후 1:30', '오후 3:00'],
          information: ['01:30:20', '1205', '654'],
        },
        {
          title: '하체 위주',
          target: ['하체', '유산소'],
          time: ['오후 1:30', '오후 3:00'],
          information: ['01:30:20', '1205', '654'],
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView>
        {!isConnected && (
          <View style={styles.connectedContainer}>
            <Text style={styles.noConnectionText}>연결된 기기 없음</Text>
            <Text style={styles.noConnectionText2}>
              Roomfit 기기를 연결해주세요.
            </Text>
            <CustomButton_B
              style={styles.connectButton}
              content="기기 연결"
              disabled={false}
              width={326}
              onPress={() =>
                navigation.navigate('ConnectDevice')
              }></CustomButton_B>
          </View>
        )}
        {isConnected && (
          <View style={{alignItems: 'center'}}>
            <CustomButton_B
              style={styles.connectButton}
              content="빠른 운동 시작"
              disabled={false}
              width={326}
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
            <Text>전체보기</Text>
          </TouchableOpacity>
        </View>

        {!existRoutine && (
          <View style={styles.routineContainer}>
            <Text style={styles.noRoutineText}>생성된 루틴이 없습니다.</Text>
            <Text style={styles.noConnectionText2}>
              루틴을 정해서 나만의 운동 패턴을 만들어보세요!
            </Text>
            <TouchableOpacity style={styles.makeRoutineButton}>
              <Text>루틴 만들기</Text>
            </TouchableOpacity>
          </View>
        )}
        {existRoutine && (
          <View>
            <RoutineBox
              title={ROUNTINE[0].title}
              targets={ROUNTINE[0].target}
              numEx={ROUNTINE[0].numEx}></RoutineBox>
            {ROUNTINE[1] && (
              <RoutineBox
                title={ROUNTINE[1].title}
                targets={ROUNTINE[1].target}
                numEx={ROUNTINE[1].numEx}></RoutineBox>
            )}
          </View>
        )}

        <Text style={styles.subtitleText}>최근 수행한 운동</Text>
        {!isExercised && (
          <View style={styles.routineContainer}>
            <Text style={styles.noRoutineText}>
              최근 운동한 기록이 없습니다.
            </Text>
          </View>
        )}
        {isExercised && (
          <View>
            <View>
              <Text style={{marginLeft: 16, marginTop: 12}}>
                {PERFORMED[0].date}
              </Text>
              <RecentExercise data={PERFORMED[0].data}></RecentExercise>
            </View>
            <View style={{height: 90}}></View>
          </View>
        )}
      </ScrollView>
      <View style={styles.navigator}>
        <TouchableOpacity style={{marginLeft: 45}}>
          <Dumbbell
            name="dumbbell"
            size={20}
            color={isExercise ? '#fff' : '#dfdfdf'}></Dumbbell>
        </TouchableOpacity>
        <TouchableOpacity>
          <Board
            name="clipboard-check"
            size={20}
            color={isRecord ? '#fff' : '#dfdfdf'}></Board>
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight: 45}}>
          <Setting
            name="settings"
            size={20}
            color={isSetting ? '#fff' : '#dfdfdf'}></Setting>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
