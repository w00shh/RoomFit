import {View, Text, TouchableOpacity, Modal, Dimensions} from 'react-native';
import Question from '../../assets/svg/buttons/single/question.svg';
import CustomButton_B from '../CustomButton_B';
import {useEffect} from 'react';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

export const TutBtn = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Question height={16 * height_ratio} width={16 * width_ratio} />
    </TouchableOpacity>
  );
};

export const TutModal = props => {
  return (
    <Modal visible={props.visible} transparent={true} animationType="fade">
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: 0,
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 336 * height_ratio,
            width: 296 * width_ratio,
            backgroundColor: '#FFFFFF',
            borderRadius: 16 * height_ratio,

            paddingVertical: 16 * height_ratio,
            paddingHorizontal: 16 * width_ratio,
          }}>
          <Text
            style={{
              fontSize: 16 * height_ratio,
              fontWeight: 700,
              color: '#242424',
              marginTop: 16 * height_ratio,
              textAlign: 'center',
            }}>
            유효 수행시간(TUT) 이란?
          </Text>
          <Text
            style={{
              fontSize: 14 * height_ratio,
              color: '#242424',
              textAlign: 'center',
            }}>
            유효수행시간(TUT)는 Time Under Tension의 줄임말로, 운동을 할때 한
            세트동안 근육을 사용하는 총시간을 의미합니다. 피트니스 운동에서는
            TUT를 증가시키는 것이 근육 발달에 도움을 준다고 알려져 있습니다.
            예를 들어, 같은 reps 수를 수행하더라도, 동작을 천천히 수행하여 TUT를
            증가시키면 근육 발달에 더욱 효과적이라고 합니다.
          </Text>
          <CustomButton_B
            marginVertical={0}
            content={'확인'}
            onPress={() => {
              props.setShowTut(false);
            }}></CustomButton_B>
        </View>
      </View>
    </Modal>
  );
};
