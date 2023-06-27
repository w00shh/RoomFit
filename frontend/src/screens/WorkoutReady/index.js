import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import WorkoutItem from '../../components/WorkoutItem/';
import CustomButton_W from '../../components/CustomButton_W';
import CustomButton_B from '../../components/CustomButton_B';
import Back from 'react-native-vector-icons/Ionicons';

import {useSelector, useDispatch} from 'react-redux';
import {setTargetMotionId, setTargetSetId} from '../../redux/actions';

const WorkoutReady = ({navigation, route}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [motionList, setMotionList] = useState([]);
  const [selectedMode, setSelectedMode] = useState({
    modeName: '기본',
    modeDescription: '설명',
  });

  const {targetmotionid, targetsetid} = useSelector(state => state.userReducer);

  const dispatch = useDispatch();

  const modeList = [
    {
      modeName: '기본',
      modeDescription: '설명',
    },
    {
      modeName: '고무밴드',
      modeDescription: '설명',
    },
    {
      modeName: '모드1',
      modeDescription: '설명',
    },
    {
      modeName: '모드2',
      modeDescription: '설명',
    },
    {
      modeName: '모드3',
      modeDescription: '설명',
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.reset({routes: [{name: 'HomeScreen'}]})}>
          <Back
            name="arrow-back"
            color={'#242424'}
            size={25}
            style={{marginLeft: 10, marginRight: 10}}></Back>
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
          isFavorite: route.params.displaySelected[i].isFavorite,
          motion_id: route.params.displaySelected[i].motion_id,
          motionName: route.params.displaySelected[i].motionName,
          imageUrl: route.params.displaySelected[i].imageUrl,
          sets: [
            {
              weight: 0,
              reps: 0,
              mode: '기본',
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
            height: 72,
            padding: 12,
            margin: 4,
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
    //console.log(selectedMode.modeName);
  };

  const handleCancelPress = () => {
    setIsModalVisible(false);
  };

  const handleSelectPress = () => {
    updatedMotionList = [...motionList];
    updatedMotionList[targetmotionid].sets[targetsetid].mode =
      selectedMode.modeName;
    setMotionList(updatedMotionList);

    setIsModalVisible(false);
  };

  useEffect(() => {
    if (motionList[1]) {
      if (motionList[1] && motionList[1].sets[1]) {
        console.log(motionList[1].sets[1].mode);
      }
    }
  }, [motionList]);

  const handleAddMotionPress = () => {
    navigation.push('AddMotion', {motionList: motionList});
  };

  const handleStartWorkoutPress = () => {
    navigation.navigate('WorkoutStart', {
      isAddMotion: false,
      motionList: motionList,
      elapsedTime: 0,
      TUT: 0,
      m_index: 0,
      s_index: 0,
      isPaused: false,
      isPausedPage: false,
      isModifyMotion: false,
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
                data={modeList}
                renderItem={({item}) => <Item mode={item}></Item>}
                keyExtractor={item => item.modeName}></FlatList>
            </View>

            <View style={styles.modeButtonContainer}>
              <View>
                <CustomButton_W
                  width={171}
                  content="취소"
                  onPress={handleCancelPress}
                  disabled={false}></CustomButton_W>
              </View>
              <View>
                <CustomButton_B
                  width={171}
                  content="선택 완료"
                  onPress={handleSelectPress}
                  disabled={false}></CustomButton_B>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView style={{height: 450}}>
        {motionList &&
          motionList.map((value, key) => (
            <WorkoutItem
              key={key}
              id={value.motion_id}
              isExercising={false}
              setIsModalVisible={setIsModalVisible}
              motion={value}
              motionList={motionList}
              setMotionList={setMotionList}></WorkoutItem>
          ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonSection}>
          <CustomButton_W
            width={171}
            content="+ 동작 추가"
            onPress={() => {
              handleAddMotionPress();
            }}
            disabled={false}></CustomButton_W>
        </View>
        <View style={styles.buttonSection}>
          <CustomButton_B
            width={171}
            content="운동 시작"
            onPress={handleStartWorkoutPress}
            disabled={false}></CustomButton_B>
        </View>
      </View>
    </View>
  );
};

export default WorkoutReady;
