import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

const styles = StyleSheet.create({
  workoutItemContainer: {
    flexDirection: 'column',
  },
  setListContainer: {
    flexDirection: 'column',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12 * height_ratio,
    paddingHorizontal: 8 * width_ratio,
  },
  icon: {
    marginRight: 4 * width_ratio,
  },
});

export default styles;
