import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import styles from './styles';
import {AppContext} from '../../../contexts/AppProvider';
import Right from '../../../assets/svg/buttons/single/arrow/right_no.svg';
import Back from '../../../assets/svg/buttons/single/back.svg';
import Check from '../../../assets/svg/buttons/active/check.svg';
import CustomButton_B from '../../../components/CustomButton_B';
import CustomButton_W from '../../../components/CustomButton_W';
import {serverAxios} from '../../../utils/commonAxios';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const CustomMotion = ({navigation}) => {
  const appcontext = useContext(AppContext);
  const [motionName, setMotionName] = useState('');
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [tempmainMuscle, setTempMainMuscle] = useState([]);
  const [mainMuscle, setMainMuscle] = useState([]);
  const [tempSubMuscle, setTempSubMuscle] = useState([]);
  const [subMuscle, setSubMuscle] = useState([]);
  const [tempWorkoutWay, setTempWorkoutWay] = useState('');
  const [workoutWay, setWorkoutWay] = useState('');
  const [wNum, setWnum] = useState();
  const [tempTool, setTempTool] = useState('');
  const [tool, setTool] = useState('');
  const [allSelection, setAllSelection] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.push('AddMotion', {
              isRoutine: false,
              motion_index_base: 0,
              isCustom: true,
            });
          }}>
          <Back height={24 * height_ratio} width={24 * width_ratio} />
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    if (
      motionName.length > 0 &&
      mainMuscle &&
      subMuscle &&
      workoutWay &&
      tool
    ) {
      setAllSelection(false);
    }
  }, [mainMuscle, subMuscle, workoutWay, tool, motionName]);

  const muscleList = [
    {target: '어깨', selected: false},
    {target: '등', selected: false},
    {target: '가슴', selected: false},
    {target: '코어', selected: false},
    {target: '하체', selected: false},
    {target: '이두', selected: false},
    {target: '삼두', selected: false},
    {target: '엉덩이', selected: false},
  ];
  const WW = ['양팔 동시에 운동', '한팔씩 번갈아 운동', '한팔로만 운동'];
  const TOOL = ['핸들', '바', 'Y로프'];

  const renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (tempmainMuscle.includes(item.item)) {
            setTempMainMuscle(
              tempmainMuscle.filter(muscle => muscle !== item.item),
            );
          } else {
            setTempMainMuscle([...tempmainMuscle, item.item]);
          }
        }}>
        <View
          style={{
            marginBottom: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: 56 * height_ratio,
            backgroundColor: tempmainMuscle.includes(item.item)
              ? '#f5f5f5'
              : 'white',
          }}>
          <View style={styles.restContainer}>
            <Text
              style={{
                fontSize: 16 * height_ratio,
                color: tempmainMuscle.includes(item.item)
                  ? '#5252fa'
                  : '#242424',
              }}>
              {item.item}
            </Text>
          </View>
          <View style={styles.restChecker}>
            {tempmainMuscle.includes(item.item) && (
              <Check height={16 * height_ratio} width={16 * width_ratio} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem2 = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (tempSubMuscle.includes(item.item)) {
            setTempSubMuscle(
              tempSubMuscle.filter(muscle => muscle !== item.item),
            );
          } else {
            setTempSubMuscle([...tempSubMuscle, item.item]);
          }
        }}>
        <View
          style={{
            marginBottom: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: 56 * height_ratio,
            backgroundColor: tempSubMuscle.includes(item.item)
              ? '#f5f5f5'
              : 'white',
          }}>
          <View style={styles.restContainer}>
            <Text
              style={{
                fontSize: 16 * height_ratio,
                color: tempSubMuscle.includes(item.item)
                  ? '#5252fa'
                  : '#242424',
              }}>
              {item.item}
            </Text>
          </View>
          <View style={styles.restChecker}>
            {tempSubMuscle.includes(item.item) && (
              <Check height={16 * height_ratio} width={16 * width_ratio} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem3 = item => {
    return (
      <TouchableOpacity onPress={() => setTempWorkoutWay(item.item)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: 56 * height_ratio,
            backgroundColor: item.item === tempWorkoutWay ? '#f5f5f5' : 'white',
          }}>
          <View style={styles.restContainer}>
            <Text
              style={{
                fontSize: 16 * height_ratio,
                color: item.item === tempWorkoutWay ? '#5252fa' : '#242424',
              }}>
              {item.item}
            </Text>
          </View>
          <View style={styles.restChecker}>
            {item.item === tempWorkoutWay && (
              <Check height={16 * height_ratio} width={16 * width_ratio} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem4 = item => {
    return (
      <TouchableOpacity onPress={() => setTempTool(item.item)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: 56 * height_ratio,
            backgroundColor: item.item === tempTool ? '#f5f5f5' : 'white',
          }}>
          <View style={styles.restContainer}>
            <Text
              style={{
                fontSize: 16 * height_ratio,
                color: item.item === tempTool ? '#5252fa' : '#242424',
              }}>
              {item.item}
            </Text>
          </View>
          <View style={styles.restChecker}>
            {item.item === tempTool && (
              <Check height={16 * height_ratio} width={16 * width_ratio} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const saveCustomMotion = async () => {
    const body = {
      user_id: appcontext.state.userid,
      motion_name: motionName,
      body_region: mainMuscle.join(', '),
      sub_muscle: subMuscle.join(', '),
      sequence: workoutWay,
      grip: tool,
      description: '',
    };
    await serverAxios
      .post('/motion/custom', body)
      .then(res => {
        const newMotionItem = {
          add_on: null,
          body_region: mainMuscle.join(', '),
          count: 0,
          description: motionName + ' Description',
          grip: tool,
          image_url: null,
          isFav: false,
          main_muscle: null,
          motion_english_name: motionName,
          motion_id: res.data,
          motion_name: motionName,
          motion_range_max: 100,
          motion_range_min: 40,
          sequence: null,
          sub_muscle: subMuscle.join(', '),
          user_id: appcontext.state.userid,
        };

        appcontext.actions.setMotionList(prevMotionList => [
          ...prevMotionList,
          newMotionItem,
        ]);
      })
      .catch(e => console.log(e));

    navigation.push('AddMotion', {
      isRoutine: false,
      motion_index_base: 0,
      isCustom: true,
    });
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Modal visible={modal1} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modeContainer}>
            <View style={styles.modeTitleContainer}>
              <Text style={styles.titleText}>주 근육</Text>
            </View>
            <View>
              <FlatList
                data={appcontext.state.bodyRegionList}
                renderItem={renderItem}></FlatList>
            </View>
            <View style={styles.modeButtonContainer}>
              <View>
                <CustomButton_W
                  width={171 * width_ratio}
                  content="취소"
                  disabled={false}
                  onPress={() => setModal1(false)}></CustomButton_W>
              </View>
              <View>
                <CustomButton_B
                  width={171 * width_ratio}
                  content="선택 완료"
                  disabled={false}
                  onPress={() => {
                    setModal1(false);
                    setMainMuscle(tempmainMuscle);
                  }}></CustomButton_B>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={modal2} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modeContainer}>
            <View style={styles.modeTitleContainer}>
              <Text style={styles.titleText}>보조 근육{'(복수선택 가능)'}</Text>
            </View>
            <View>
              <FlatList
                data={appcontext.state.bodyRegionList}
                renderItem={renderItem2}></FlatList>
            </View>
            <View style={styles.modeButtonContainer}>
              <View>
                <CustomButton_W
                  width={171 * width_ratio}
                  content="취소"
                  disabled={false}
                  onPress={() => setModal2(false)}></CustomButton_W>
              </View>
              <View>
                <CustomButton_B
                  width={171 * width_ratio}
                  content="선택 완료"
                  disabled={false}
                  onPress={() => {
                    setModal2(false);
                    setSubMuscle(tempSubMuscle);
                  }}></CustomButton_B>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={modal3} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modeContainer}>
            <View style={styles.modeTitleContainer}>
              <Text style={styles.titleText}>운동방식</Text>
            </View>
            <View>
              <FlatList data={WW} renderItem={renderItem3}></FlatList>
            </View>
            <View style={styles.modeButtonContainer}>
              <View>
                <CustomButton_W
                  width={171 * width_ratio}
                  content="취소"
                  disabled={false}
                  onPress={() => setModal3(false)}></CustomButton_W>
              </View>
              <View>
                <CustomButton_B
                  width={171 * width_ratio}
                  content="선택 완료"
                  disabled={false}
                  onPress={() => {
                    setModal3(false);
                    setWorkoutWay(tempWorkoutWay);
                    if (tempWorkoutWay === '양팔 동시에 운동') {
                      setWnum(1);
                    } else if (tempWorkoutWay === '한팔씩 번갈아 운동') {
                      setWnum(2);
                    } else {
                      setWnum(3);
                    }
                  }}></CustomButton_B>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={modal4} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modeContainer}>
            <View style={styles.modeTitleContainer}>
              <Text style={styles.titleText}>도구</Text>
            </View>
            <View>
              <FlatList data={TOOL} renderItem={renderItem4}></FlatList>
            </View>
            <View style={styles.modeButtonContainer}>
              <View>
                <CustomButton_W
                  width={171 * width_ratio}
                  content="취소"
                  disabled={false}
                  onPress={() => setModal4(false)}></CustomButton_W>
              </View>
              <View>
                <CustomButton_B
                  width={171 * width_ratio}
                  content="선택 완료"
                  disabled={false}
                  onPress={() => {
                    setModal4(false);
                    setTool(tempTool);
                  }}></CustomButton_B>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <TextInput
          style={styles.nameContainer}
          placeholder="운동 이름"
          placeholderTextColor={'#acacac'}
          onChangeText={text => setMotionName(text)}></TextInput>

        <TouchableOpacity onPress={() => setModal1(true)}>
          <View style={styles.selectContainer}>
            <Text style={styles.title}>주 근육</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  marginRight: 8 * width_ratio,
                  color: '#242424',
                  fontSize: 14 * height_ratio,
                }}>
                {mainMuscle.join(', ')}
              </Text>
              <Right></Right>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModal2(true)}>
          <View style={styles.selectContainer}>
            <Text style={styles.title}>보조 근육</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  marginRight: 8 * width_ratio,
                  color: '#242424',
                  fontSize: 14 * height_ratio,
                }}>
                {subMuscle.join(', ')}
              </Text>
              <Right></Right>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModal3(true)}>
          <View style={styles.selectContainer}>
            <Text style={styles.title}>운동 방식</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  marginRight: 8 * width_ratio,
                  color: '#242424',
                  fontSize: 14 * height_ratio,
                }}>
                {workoutWay}
              </Text>
              <Right></Right>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModal4(true)}>
          <View style={styles.selectContainer}>
            <Text style={styles.title}>도구</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  marginRight: 8 * width_ratio,
                  color: '#242424',
                  fontSize: 14 * height_ratio,
                }}>
                {tool}
              </Text>
              <Right></Right>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 16}}>
        <CustomButton_B
          disabled={allSelection}
          content="커스텀 동작 추가 완료"
          width={358 * width_ratio}
          onPress={() => saveCustomMotion()}></CustomButton_B>
      </View>
    </SafeAreaView>
  );
};

export default CustomMotion;
