import {
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import styles from './styles';
import {useContext, useEffect} from 'react';
import {AppContext} from '../../contexts/AppProvider';
//svg
import Back from '../../assets/svg/buttons/single/back.svg';
import Star_A from '../../assets/svg/buttons/active/star.svg';
import Star_D from '../../assets/svg/buttons/default/star.svg';
import DefaultImage from '../../assets/svg/icons/default_workout.svg';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const MotionDetail = ({navigation, route}) => {
  const appcontext = useContext(AppContext);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Back height={24 * height_ratio} width={24 * width_ratio} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1 * height_ratio,
          }}>
          <Text
            style={{
              marginHorizontal: Platform.OS === 'ios' ? 0 : 6 * width_ratio,
              color: '#242424',
              fontSize: 16 * height_ratio,
              fontWeight: '700',
            }}>
            {route.params.motion.motion_name}
          </Text>
          <Text style={{fontSize: 12 * height_ratio, color: '#808080'}}>
            {route.params.motion.motion_name}
          </Text>
        </View>
      ),
      headerRight: () =>
        route.params.motion.isFav ? (
          //   <TouchableWithoutFeedback
          //     onPress={async () => {
          //       console.log('heelo');
          //       updatedMotionList = [...route.params.motionList];
          //       updatedMotionList[
          //         updatedMotionList.findIndex(
          //           item => item === route.params.motion,
          //         )
          //       ].isFav = !route.params.motion.isFav;

          //       const body = {
          //         user_id: appcontext.state.userid,
          //         motion_id: route.params.motion.motion_id,
          //       };
          //       if (
          //         updatedMotionList[
          //           updatedMotionList.findIndex(
          //             item => item === route.params.motion,
          //           )
          //         ].isFav
          //       ) {
          //         /* 즐겨찾기 추가 API 호출 */
          //         await serverAxios
          //           .post('/motion/favInsert', body)
          //           .then(res => {})
          //           .catch(e => {
          //             console.log(e);
          //           });
          //       } else {
          //         /* 즐겨찾기 삭제 API 호출 */
          //         await serverAxios
          //           .post('/motion/favDelete', body)
          //           .then(res => {})
          //           .catch(e => {
          //             console.log(e);
          //           });
          //       }
          //       route.params.setMotionList(updatedMotionList);
          //     }}>
          <Star_A height={24 * height_ratio} width={24 * width_ratio} />
        ) : (
          //   </TouchableWithoutFeedback>
          //   <TouchableWithoutFeedback
          //     onPress={async () => {
          //       updatedMotionList = [...route.params.motionList];
          //       updatedMotionList[
          //         updatedMotionList.findIndex(
          //           item => item === route.params.motion,
          //         )
          //       ].isFav = !route.params.motion.isFav;
          //       const body = {
          //         user_id: appcontext.state.userid,
          //         motion_id: route.params.motion.motion_id,
          //       };
          //       if (
          //         updatedMotionList[
          //           updatedMotionList.findIndex(
          //             item => item === route.params.motion,
          //           )
          //         ].isFav
          //       ) {
          //         /* 즐겨찾기 추가 API 호출 */
          //         await serverAxios
          //           .post('/motion/favInsert', body)
          //           .then(res => {})
          //           .catch(e => {
          //             console.log(e);
          //           });
          //       } else {
          //         /* 즐겨찾기 삭제 API 호출 */
          //         await serverAxios
          //           .post('/motion/favDelete', body)
          //           .then(res => {})
          //           .catch(e => {
          //             console.log(e);
          //           });
          //       }
          //       route.params.setMotionList(updatedMotionList);
          //     }}>
          <Star_D height={24 * height_ratio} width={24 * width_ratio} />
          //   </TouchableWithoutFeedback>
        ),
    });
  }, []);

  return (
    <View style={styles.pageContainer}>
      <View>
        {route.params.motion.image_url ? (
          <Image
            source={{
              uri: route.params.motion.image_url,
            }}
            style={{
              width: 200 * width_ratio,
              height: 200 * height_ratio,
            }}></Image>
        ) : (
          <DefaultImage
            width={200 * width_ratio}
            height={200 * height_ratio}></DefaultImage>
        )}
      </View>
      <View style={styles.targetContainer}>
        <Text style={styles.titleText}>운동부위</Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 8 * height_ratio,
            marginBottom: 24 * height_ratio,
          }}>
          {route.params.motion.body_region && (
            <View style={styles.targetBox}>
              <Text>{route.params.motion.body_region}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.titleText}>운동상세</Text>
        <Text>{route.params.motion.description}</Text>
      </View>
    </View>
  );
};

export default MotionDetail;
