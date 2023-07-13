import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  workoutItemContainer: {
    flexDirection: 'column',
    gap: 16 * height_ratio,
    backgroundColor: '#fff',
    marginVertical: 16 * height_ratio,
  },
  setListContainer: {
    flexDirection: 'column',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 4 * width_ratio,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4 * width_ratio,
    paddingHorizontal: 8 * width_ratio,
  },
  icon: {
    marginRight: 4 * width_ratio,
  },
});

export default styles;
