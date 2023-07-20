import React, {useContext} from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {serverAxios} from '../../utils/commonAxios';
import {AppContext} from '../../contexts/AppProvider';

//svg
import Star_A from '../../assets/svg/buttons/active/star.svg';
import Star_D from '../../assets/svg/buttons/default/star.svg';
import Question from '../../assets/svg/buttons/single/question.svg';
import Check from '../../assets/svg/buttons/active/check.svg';
import DefaultImage from '../../assets/svg/icons/default_workout.svg';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const MotionItem = props => {
  const appcontext = useContext(AppContext);
  return (
    <View style={styles.motionContainer}>
      <View style={styles.leftContainer}>
        {props.motion.isFav ? (
          <TouchableWithoutFeedback
            onPress={async () => {
              updatedMotionList = [...props.motionList];
              updatedMotionList[
                updatedMotionList.findIndex(item => item === props.motion)
              ].isFav = !props.motion.isFav;

              const body = {
                user_id: appcontext.state.userid,
                motion_id: props.motion.motion_id,
              };
              if (
                updatedMotionList[
                  updatedMotionList.findIndex(item => item === props.motion)
                ].isFav
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
            <Star_A height={24 * height_ratio} width={24 * width_ratio} />
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback
            onPress={async () => {
              updatedMotionList = [...props.motionList];
              updatedMotionList[
                updatedMotionList.findIndex(item => item === props.motion)
              ].isFav = !props.motion.isFav;
              const body = {
                user_id: appcontext.state.userid,
                motion_id: props.motion.motion_id,
              };
              if (
                updatedMotionList[
                  updatedMotionList.findIndex(item => item === props.motion)
                ].isFav
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
            <Star_D height={24 * height_ratio} width={24 * width_ratio} />
          </TouchableWithoutFeedback>
        )}

        <View style={styles.imageContainer}>
          {props.motion.image_url ? (
            <Image
              source={{
                uri: props.motion.image_url,
              }}
              style={{
                width: 48 * width_ratio,
                height: 48 * height_ratio,
              }}></Image>
          ) : (
            <DefaultImage
              width={48 * width_ratio}
              height={48 * height_ratio}></DefaultImage>
          )}
        </View>
        <View style={styles.nameContainer}>
          <Text
            style={{
              fontSize: 14 * height_ratio,
              color: props.selected ? '#5252fa' : '#242424',
            }}>
            {props.motion.motion_name}
          </Text>
          <Text
            style={{
              fontSize: 14 * height_ratio,
              color: props.selected ? '#5252fa' : '#808080',
            }}>
            {props.motion.motion_name}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            paddingHorizontal: 8 * width_ratio,
            paddingVertical: 16 * height_ratio,
          }}
          onPress={props.navigateToMotionDetail}>
          <Question height={16 * height_ratio} width={16 * width_ratio} />
        </TouchableOpacity>
      </View>
      {props.selected && (
        <View>
          <Check height={16 * height_ratio} width={16 * width_ratio} />
        </View>
      )}
    </View>
  );
};

export default MotionItem;
