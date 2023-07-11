import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import styles from './styles';
import WorkoutItem from '../../components/WorkoutItem/';
import CustomButton_W from '../../components/CustomButton_W';
import CustomButton_B from '../../components/CustomButton_B';
import {serverAxios} from '../../utils/commonAxios';
import {AppContext} from '../../contexts/AppProvider';
import {Divder} from '../../components/divider';

//svg
import Back from '../../assets/svg/buttons/single/back.svg';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const WorkoutReady = ({navigation, route}) => {
  const appcontext = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [motionList, setMotionList] = useState([]);
  const [selectedMode, setSelectedMode] = useState({
    modeName: '기본',
    modeDescription: '설명',
  });
  const [workoutId, setWorkoutId] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.reset({routes: [{name: 'HomeScreen'}]})}>
          <Back height={24 * height_ratio} width={24 * width_ratio}></Back>
        </TouchableOpacity>
      ),
    });
    if (route.params.motionList) {
      setMotionList(route.params.motionList);
    }
    for (let i = 0; i < route.params.displaySelected.length; i++) {
      setMotionList(currentMotionList => [
        ...currentMotionList,
        {
          isMotionDone: false,
          isMotionDoing: false,
          doingSetIndex: 0,
          isFav: route.params.displaySelected[i].isFav,
          motion_id: route.params.displaySelected[i].motion_id,
          motion_name: route.params.displaySelected[i].motion_name,
          imageUrl: route.params.displaySelected[i].imageUrl,
          sets: [
            {
              weight: 0,
              reps: 1,
              mode: '기본',
              isDoing: false,
              isDone: false,
            },
          ],
        },
      ]);
    }
  }, []);

  function Item({mode}) {
    return (
      <TouchableOpacity
        onPress={() => {
          handleModeItemPress(mode);
        }}>
        <View
          style={{
            flexDirection: 'column',
            height: 72 * height_ratio,
            paddingVertical: 12 * height_ratio,
            paddingHorizontal: 12 * width_ratio,
            marginVertical: 4 * height_ratio,
            marginHorizontal: 4 * width_ratio,
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor:
              mode.modeName === selectedMode.modeName ? '#f5f5f5' : 'white',
          }}>
          <Text style={styles.modeText}>{mode.modeName}</Text>
          <Text style={styles.descriptionText}>{mode.modeDescription}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  const handleModeItemPress = mode => {
    setSelectedMode(mode);
  };

  const handleCancelPress = () => {
    setIsModalVisible(false);
  };

  const handleSelectPress = () => {
    updatedMotionList = [...motionList];
    updatedMotionList[appcontext.state.targetmotionindex].sets[
      appcontext.state.targetsetindex
    ].mode = selectedMode.modeName;
    setMotionList(updatedMotionList);

    setIsModalVisible(false);
  };

  const handleAddMotionPress = () => {
    navigation.push('AddMotion', {motionList: motionList});
  };

  useEffect(() => {
    if (workoutId) {
      navigation.navigate('WorkoutStart', {
        isQuickWorkout: true,
        workout_id: workoutId,
        isAddMotion: false,
        motionList: motionList,
        elapsedTime: 0,
        TUT: 0,
        m_index: 0,
        s_index: 0,
        isPaused: false,
        isPausedPage: false,
        isModifyMotion: false,
        isResting: false,
        restTimer: appcontext.state.userSetTimer,
      });
    }
  }, [workoutId]);

  const handleStartWorkoutPress = async () => {
    const body = {
      user_id: 'user1',
    };
    await serverAxios
      .post('/workout', body)
      .then(res => {
        setWorkoutId(res.data.workout_id);
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <View style={styles.pageContainer}>
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modeContainer}>
            <View style={styles.modeTitleContainer}>
              <Text style={styles.titleText}>하중모드</Text>
              <Text>{selectedMode.modeName}</Text>
            </View>
            <View>
              <FlatList
                data={appcontext.state.modeList}
                renderItem={({item}) => <Item mode={item}></Item>}
                keyExtractor={item => item.modeName}></FlatList>
            </View>

            <View style={styles.modeButtonContainer}>
              <View>
                <CustomButton_W
                  width={171 * width_ratio}
                  content="취소"
                  onPress={handleCancelPress}
                  disabled={false}></CustomButton_W>
              </View>
              <View>
                <CustomButton_B
                  width={171 * width_ratio}
                  content="선택 완료"
                  onPress={handleSelectPress}
                  disabled={false}></CustomButton_B>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={motionList}
        style={{height: 450 * height_ratio}}
        renderItem={({item, index}) => {
          const isEnd = index === motionList.length - 1;
          return (
            <>
              <WorkoutItem
                motion_index={index}
                id={item.motion_id}
                isExercising={false}
                setIsModalVisible={setIsModalVisible}
                motion={item}
                motionList={motionList}
                setMotionList={setMotionList}
                modeList={modeList}
                setSelectedMode={setSelectedMode}></WorkoutItem>
              {!isEnd && <Divder height_ratio={height_ratio} />}
            </>
          );
        }}></FlatList>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonSection}>
          <CustomButton_W
            width={171 * width_ratio}
            content="+ 동작 추가"
            onPress={() => {
              handleAddMotionPress();
            }}
            disabled={false}></CustomButton_W>
        </View>
        <View style={styles.buttonSection}>
          <CustomButton_B
            width={171 * width_ratio}
            content="운동 시작"
            onPress={handleStartWorkoutPress}
            disabled={false}></CustomButton_B>
        </View>
      </View>
    </View>
  );
};

export default WorkoutReady;
