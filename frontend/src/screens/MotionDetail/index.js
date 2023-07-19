import {
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';
import {useContext, useEffect} from 'react';

//svg
import Back from '../../assets/svg/buttons/single/back.svg';
import Star_A from '../../assets/svg/buttons/active/star.svg';
import Star_D from '../../assets/svg/buttons/default/star.svg';
import {AppContext} from '../../contexts/AppProvider';

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
  }, [route.params.motionList]);

  return (
    <View style={styles.pageContainer}>
      <View></View>
    </View>
  );
};

export default MotionDetail;
