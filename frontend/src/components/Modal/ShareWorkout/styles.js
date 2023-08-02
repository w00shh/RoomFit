import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 0,
  },
  shareWorkoutContainer: {
    paddingHorizontal: 16 * width_ratio,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 24 * height_ratio,
    gap: 8 * height_ratio,
  },
  popuptopContainer: {
    height: 24 * height_ratio,
  },
  contentContainer: {
    flexDirection: 'column',
    gap: 16 * height_ratio,
    alignItems: 'center',
    marginVertical: 8 * height_ratio,
  },
  titleText: {
    fontSize: 16 * height_ratio,
    fontWeight: '700',
    color: '#242424',
  },
  descriptionContainer: {
    flexDirection: 'column',
    gap: 2 * height_ratio,
  },
  descriptionText: {
    fontSize: 14 * height_ratio,
    color: '#242424',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 12 * width_ratio,
    paddingVertical: 16 * height_ratio,
  },
});

export default styles;
