import React, {useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {serverAxios} from '../../utils/commonAxios';

const MotionItem = props => {
  return (
    <View style={styles.motionContainer}>
      {props.motion.isFavorite ? (
        <TouchableWithoutFeedback
          onPress={async () => {
            updatedMotionList = [...props.motionList];
            updatedMotionList[
              updatedMotionList.findIndex(item => item === props.motion)
            ].isFavorite = !props.motion.isFavorite;

            const body = {
              user_id: 'user1',
              motion_id: props.motion.motion_id,
            };
            if (
              updatedMotionList[
                updatedMotionList.findIndex(item => item === props.motion)
              ].isFavorite
            ) {
              /* 즐겨찾기 추가 API 호출 */
              await serverAxios
                .post('/motion/favInsert', body)
                .then(res => {})
                .catch(e => {
                  console.log(e);
                });
            } else {
              /* 즐겨찾기 삭제 API 호출 */
              await serverAxios
                .post('/motion/favDelete', body)
                .then(res => {})
                .catch(e => {
                  console.log(e);
                });
            }
            props.setMotionList(updatedMotionList);
          }}>
          <Icon name="star" size={20} color="#fbcb22"></Icon>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback
          onPress={async () => {
            updatedMotionList = [...props.motionList];
            updatedMotionList[
              updatedMotionList.findIndex(item => item === props.motion)
            ].isFavorite = !props.motion.isFavorite;
            const body = {
              user_id: 'user1',
              motion_id: props.motion.motion_id,
            };
            if (
              updatedMotionList[
                updatedMotionList.findIndex(item => item === props.motion)
              ].isFavorite
            ) {
              /* 즐겨찾기 추가 API 호출 */
              await serverAxios
                .post('/motion/favInsert', body)
                .then(res => {})
                .catch(e => {
                  console.log(e);
                });
            } else {
              /* 즐겨찾기 삭제 API 호출 */
              await serverAxios
                .post('/motion/favDelete', body)
                .then(res => {})
                .catch(e => {
                  console.log(e);
                });
            }
            props.setMotionList(updatedMotionList);
          }}>
          <Icon name="staro" size={20}></Icon>
        </TouchableWithoutFeedback>
      )}

      {/* <Icon name="staro" size={20}></Icon> */}

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: props.motion.imageUrl,
          }}
          style={{width: 48, height: 48}}></Image>
      </View>
      <View style={styles.nameContainer}>
        <Text
          style={{
            fontSize: 14,
            color: props.selected ? '#5252fa' : '#242424',
          }}>
          {props.motion.motionName}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: props.selected ? '#5252fa' : '#808080',
          }}>
          {props.motion.motionName}
        </Text>
      </View>
    </View>
  );
};

export default MotionItem;
