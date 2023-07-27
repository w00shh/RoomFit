import {useEffect, useState} from 'react';
import {Text, View, Dimensions, Platform} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const WorkoutStartSplash = ({navigation, route}) => {
  const [second, setSecond] = useState(3);
  useEffect(() => {
    setTimeout(() => {
      setSecond(prevSecond => prevSecond - 1);
    }, 1000);
  }, [second]);

  useEffect(() => {
    if (second === 1) {
      if (route.params.routine_id) {
        setTimeout(() => {
          navigation.navigate('WorkoutStart', {
            routine_index: route.params.routine_index,
            routine_detail_index: route.params.routine_detail_index,
            motion_index_base: 0,
            isQuickWorkout: route.params.isQuickWorkout,
            routine_id: route.params.routine_id,
            workout_id: route.params.workout_id,
            isAddMotion: route.params.isAddMotion,
            motionList: route.params.motionList,
            elapsedTime: route.params.elapsedTime,
            TUT: route.params.TUT,
            m_index: route.params.m_index,
            s_index: route.params.s_index,
            isPaused: route.params.isPaused,
            isPausedPage: route.params.isPausedPage,
            isModifyMotion: route.params.isModifyMotion,
            isResting: route.params.isResting,
            restTimer: route.params.restTimer,
          });
        }, 650);
      } else {
        setTimeout(() => {
          navigation.navigate('WorkoutStart', {
            motion_index_base: 0,
            isQuickWorkout: route.params.isQuickWorkout,
            workout_id: route.params.workout_id,
            isAddMotion: route.params.isAddMotion,
            motionList: route.params.motionList,
            elapsedTime: route.params.elapsedTime,
            TUT: route.params.TUT,
            m_index: route.params.m_index,
            s_index: route.params.s_index,
            isPaused: route.params.isPaused,
            isPausedPage: route.params.isPausedPage,
            isModifyMotion: route.params.isModifyMotion,
            isResting: route.params.isResting,
            restTimer: route.params.restTimer,
          });
        }, 650);
      }
    }
  }, [second]);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16 * height_ratio,
        paddingHorizontal: 16 * width_ratio,
        backgroundColor: '#5252fa',
      }}>
      <Text
        style={{
          fontSize: 120 * height_ratio,
          fontWeight: '700',
          color: '#fff',
        }}>
        {second}
      </Text>
    </View>
  );
};

export default WorkoutStartSplash;
