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

const WorkoutReady = ({navigation, route}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [motionList, setMotionList] = useState([]);
  const [selectedMode, setSelectedMode] = useState({
    modeName: '기본모드',
    modeDescription: '설명',
  });

  const modeList = [
    {
      modeName: '기본모드',
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
    for (let i = 0; i < route.params.selectedMotionKeys.length; i++) {
      setMotionList(currentMotionList => [
        ...currentMotionList,
        {
          motion_id: route.params.selectedMotionKeys[i],
          motionName: '',
          imageUrl: '',
          set: [],
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
    console.log(selectedMode.modeName);
  };

  const handleCancelPress = () => {
    setIsModalVisible(false);
  };

  const handleSelectPress = () => {
    setIsModalVisible(false);
  };

  const handleAddMotionPress = () => {
    navigation.navigate('AddMotion');
  };

  const handleStartWorkoutPress = () => {
    navigation.navigate('WorkoutStart', {motionList: motionList});
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
              motion={value}
              isExercising={false}
              setIsModalVisible={setIsModalVisible}
              motionList={motionList}
              setMotionList={setMotionList}
              selectedMode={selectedMode}></WorkoutItem>
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
            content={route.params.isRoutine ? '루틴 운동 시작' : '운동 시작'}
            onPress={handleStartWorkoutPress}
            disabled={false}></CustomButton_B>
        </View>
      </View>
    </View>
  );
};

export default WorkoutReady;
