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
import {Divider} from '../../components/divider';

//svg
import Back from '../../assets/svg/buttons/single/back.svg';
import {
  GestureHandlerRootView,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import DraggableFlatList from 'react-native-draggable-flatlist';
import MotionRangeModal from '../../components/Modal/MotionRange';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const WorkoutReady = ({navigation, route}) => {
  const appcontext = useContext(AppContext);
  const [motionIndexBase, setMotionIndexBase] = useState(
    route.params.motion_index_base,
  );
  const [motionIndexMax, setMotionIndexMax] = useState(
    route.params.motion_index_base,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMotionRangeModalVisible, setIsMotionRangeModalVisible] =
    useState(false);
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
          motion_index: motionIndexBase + i,
          isMotionDone: false,
          isMotionDoing: false,
          doingSetIndex: 0,
          isFav: route.params.displaySelected[i].isFav,
          motion_range_min: route.params.displaySelected[i].motion_range_min,
          motion_range_max: route.params.displaySelected[i].motion_range_max,
          motion_id: route.params.displaySelected[i].motion_id,
          motion_name: route.params.displaySelected[i].motion_name,
          image_url: route.params.displaySelected[i].image_url,
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

  useEffect(() => {
    motionList.forEach((value, key) => {
      if (value.motion_index > motionIndexMax) {
        setMotionIndexMax(value.motion_index);
      }
    });
  }, [motionList]);

  const renderItem = gestureHandlerRootHOC(({item, index, drag, isActive}) => {
    return (
      <>
        <WorkoutItem
          drag={drag}
          isActive={isActive}
          motion_index={item.motion_index}
          id={item.motion_id}
          motion={item}
          isExercising={false}
          setIsModalVisible={setIsModalVisible}
          motion={item}
          motionList={motionList}
          setMotionList={setMotionList}
          setSelectedMode={setSelectedMode}
          setIsMotionRangeModalVisible={
            setIsMotionRangeModalVisible
          }></WorkoutItem>
        {item !== motionList[motionList.length - 1] && !isActive && (
          <Divider height_ratio={height_ratio} />
        )}
      </>
    );
  });

  useEffect(() => {
    if (motionList[0]) console.log(motionList[0].sets);
  }, [motionList]);

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
    navigation.push('AddMotion', {
      motionList: motionList,
      motion_index_base: motionIndexMax + 1,
    });
  };

  useEffect(() => {
    if (workoutId) {
      navigation.navigate('WorkoutStartSplash', {
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
      user_id: appcontext.state.userid,
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
      <KeyboardAwareScrollView>
        <MotionRangeModal
          isMotionRangeModalVisible={isMotionRangeModalVisible}
          setIsMotionRangeModalVisible={setIsMotionRangeModalVisible}
          motionList={motionList}
          setMotionList={setMotionList}></MotionRangeModal>
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

        <GestureHandlerRootView style={{height: 625 * height_ratio}}>
          <DraggableFlatList
            data={motionList}
            renderItem={renderItem}
            keyExtractor={item => item.motion_index}
            onDragEnd={({data}) => setMotionList(data)}
            showsVerticalScrollIndicator={false}
          />
        </GestureHandlerRootView>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonSection}>
            <CustomButton_W
              width={171 * width_ratio}
              content="+ 동작 추가"
              marginVertical={16 * height_ratio}
              onPress={() => {
                handleAddMotionPress();
              }}
              disabled={false}></CustomButton_W>
          </View>
          <View style={styles.buttonSection}>
            <CustomButton_B
              width={171 * width_ratio}
              content="운동 시작"
              marginVertical={16 * height_ratio}
              onPress={handleStartWorkoutPress}
              disabled={false}></CustomButton_B>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default WorkoutReady;
