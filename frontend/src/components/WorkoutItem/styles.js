import {StyleSheet} from 'react-native';

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
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 4,
  },
});

export default styles;
