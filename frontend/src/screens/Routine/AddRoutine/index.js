import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import WorkoutItem from '../../../components/WorkoutItem';
import {serverAxios} from '../../../utils/commonAxios';
import CustomButton_W from '../../../components/CustomButton_W';
import CustomButton_B from '../../../components/CustomButton_B';
import Back from 'react-native-vector-icons/Ionicons';
import {AppContext} from '../../../contexts/AppProvider';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

const AddRoutine = ({navigation, route}) => {
  const appcontext = useContext(AppContext);
  const [motionList, setMotionList] = useState([]);
  const [routineName, setRoutineName] = useState(route.params.routineName);
  const [isRoutineName, setIsRoutineName] = useState(false);
  const [isRoutineNameModalVisible, setIsRoutineNameModalVisible] =
    useState(false);
  const [saveRoutineNameModal, setSaveRotuineNameModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(
    motionList.length === 0 ? true : false,
  );
  const [routineId, setRoutineId] = useState(route.params.routine_id);
  const [saveWithNoname, setSaveWithNoname] = useState(false);
  const [askSaveModal, setAskSaveModal] = useState(false);

  const [selectedMode, setSelectedMode] = useState({
    modeName: '기본',
    modeDescription: '설명',
  });

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

  const handleSaveRoutine = async () => {
    const body = {
      routine_id: routineId,
      motion_list: motionList,
    };
    await serverAxios
      .post('/routine/save', body)
      .then(res => {})
      .catch(e => {
        console.log(e);
      });

    navigation.push('MyRoutine');
  };

  const handleBackButton = () => {
    console.log(motionList);
    if (motionList.length === 0) {
      deleteRoutine();
      navigation.reset({routes: [{name: 'MyRoutine'}]});
    } else {
      setAskSaveModal(true);
    }
  };

  const deleteRoutine = async () => {
    await serverAxios
      .put('/routine/delete', {
        routine_ids: routineId,
      })
      .then(res => {})
      .catch(e => {
        console.log(e);
      });
  };

  const saveRoutine = () => {
    if (routineName === '새로운 루틴') {
      setSaveRotuineNameModal(true);
      setAskSaveModal(false);
    } else {
      handleSaveRoutine();
    }
  };

  const saveRoutineWithnoName = () => {};

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            handleBackButton();
            //navigation.reset({routes: [{name: 'MyRoutine'}]});
          }}>
          <Back
            name="arrow-back"
            color={'#242424'}
            size={25 * height_ratio}
            style={{
              marginLeft: 10 * width_ratio,
              marginRight: 10 * width_ratio,
            }}></Back>
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <>
          <Text
            style={{
              marginHorizontal: 6 * width_ratio,
              color: 'black',
              fontSize: 16 * height_ratio,
              fontWeight: '700',
            }}>
            {routineName}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsRoutineNameModalVisible(!isRoutineNameModalVisible);
            }}>
            <Icon name="edit" size={16 * height_ratio} color="#808080"></Icon>
          </TouchableOpacity>
        </>
      ),
      headerRight: () => (
        <TouchableOpacity
          disabled={isSaveDisabled}
          onPress={() => {
            saveRoutine();
          }}>
          <Text style={{fontSize: 14 * height_ratio}}>저장</Text>
        </TouchableOpacity>
      ),
    });
  }, [isRoutineName, isSaveDisabled, motionList]);

  const getRoutineDetailMotionList = async () => {
    const targeturl = '/routine/detail/' + route.params.routine_id;

    await serverAxios
      .get(targeturl)
      .then(res => {
        res.data.motionList.map((value, key) => {
          setMotionList(currentMotionList => [
            ...currentMotionList,
            {
              isMotionDone: false,
              isMotionDoing: false,
              isFav: value.isFav,
              motion_id: value.motion_id,
              motion_name: value.motion_name,
              imageUrl: value.imageUrl,
              sets: value.sets,
            },
          ]);
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (route.params.isRoutineDetail) {
      getRoutineDetailMotionList();
    }

    if (route.params.isMotionAdded) {
      setMotionList(route.params.motionList);
      setIsSaveDisabled(false);
      for (let i = 0; i < route.params.displaySelected.length; i++) {
        setMotionList(currentMotionList => [
          ...currentMotionList,
          {
            isMotionDone: false,
            isMotionDoing: false,
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
    }
  }, []);

  useEffect(() => {
    if (motionList.length === 0) {
      setIsSaveDisabled(true);
    } else {
      setIsSaveDisabled(false);
    }
  }, [motionList]);

  const handleAddWorkoutMotionPress = () => {
    navigation.push('AddMotion', {
      isRoutine: true,
      routineName: routineName,
      motionList: motionList,
      routine_id: routineId,
    });
  };
  const handleConfirmPress = async () => {
    setIsRoutineName(!isRoutineName);
    setIsRoutineNameModalVisible(!isRoutineNameModalVisible);

    const body = {
      routine_id: routineId,
      routine_name: routineName,
    };
    await serverAxios
      .put('/routine/nameChange', body)
      .then(res => {})
      .catch(e => {
        console.log(e);
      });
  };

  const handleConfirmPress2 = async () => {
    const body = {
      routine_id: routineId,
      routine_name: routineName,
    };
    await serverAxios
      .put('/routine/nameChange', body)
      .then(res => {})
      .catch(e => {
        console.log(e);
      });

    const body2 = {
      routine_id: routineId,
      motion_list: motionList,
    };

    await serverAxios
      .post('/routine/save', body2)
      .then(res => {})
      .catch(e => {
        console.log(e);
      });
    setSaveRotuineNameModal(false);
    navigation.reset({routes: [{name: 'MyRoutine'}]});
  };

  return (
    <View style={styles.pageContainer}>
      <Modal visible={askSaveModal} transparent={true} animationType="fade">
        <View style={styles.modalNameContainer}>
          <View style={styles.askSaveContainer}>
            <Text style={styles.titleText}>루틴 생성 취소</Text>
            <Text
              style={{
                marginTop: 17 * height_ratio,
                fontSize: 14 * height_ratio,
              }}>
              저장하지 않고 나가게되면
            </Text>
            <Text style={{fontSize: 14 * height_ratio}}>
              데이터는 저장되지 않습니다.
            </Text>
            <View style={{flexDirection: 'row', marginTop: 13 * height_ratio}}>
              <View style={{marginRight: 5 * width_ratio}}>
                <CustomButton_W
                  width={126 * width_ratio}
                  onPress={() => {
                    setAskSaveModal(false);
                    deleteRoutine();
                    navigation.reset({routes: [{name: 'MyRoutine'}]});
                  }}
                  content="취소"></CustomButton_W>
              </View>
              <View style={{marginLeft: 5 * width_ratio}}>
                <CustomButton_B
                  width={126 * width_ratio}
                  onPress={() => saveRoutine()}
                  content="저장"></CustomButton_B>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isRoutineNameModalVisible}
        transparent={true}
        animationType="fade">
        <View style={styles.modalNameContainer}>
          <View style={styles.routineNameContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>루틴 이름</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={{fontSize: 14 * height_ratio}}
                onChangeText={text => {
                  setRoutineName(text);
                }}
                placeholder="루틴 이름"
                inputMode="text"></TextInput>
            </View>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmPress}>
              <Text style={styles.confirmText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={saveRoutineNameModal}
        transparent={true}
        animationType="fade">
        <View style={styles.modalNameContainer}>
          <View style={styles.routineNameContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>루틴 이름</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={{fontSize: 14 * height_ratio}}
                onChangeText={text => {
                  setRoutineName(text);
                }}
                placeholder="루틴 이름"
                inputMode="text"></TextInput>
            </View>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmPress2}>
              <Text style={styles.confirmText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
      {route.params.isMotionAdded || route.params.isRoutineDetail ? (
        <ScrollView style={{height: 450 * height_ratio}}>
          {motionList[0] &&
            motionList.map((value, key) => (
              <WorkoutItem
                key={key}
                motion_index={key}
                id={value.motion_id}
                motion={value}
                isExercising={false}
                setIsModalVisible={setIsModalVisible}
                motion={value}
                motionList={motionList}
                setMotionList={setMotionList}></WorkoutItem>
            ))}
        </ScrollView>
      ) : (
        <>
          <View style={styles.newRoutineContainer}>
            <Text style={styles.newRoutineText}>
              동작을 추가해 나만의 루틴을 만들어보세요.
            </Text>
          </View>
          <ScrollView></ScrollView>
        </>
      )}

      <TouchableOpacity
        onPress={handleAddWorkoutMotionPress}
        style={styles.addMotionContainer}>
        <Text style={styles.addMotionText}>+ 동작 추가</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddRoutine;
