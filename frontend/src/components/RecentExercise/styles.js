import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  performedContainer: {
    marginTop: 16 * height_ratio,
    paddingLeft: 16 * width_ratio,
    flexDirection: 'column',

    backgroundColor: '#f5f5f5',

    width: 358 * width_ratio,
    height: 112 * height_ratio,
    borderRadius: 8,
  },

  targetContainer: {
    flexDirection: 'row',
    gap: 5 * width_ratio,
    alignItems: 'center',
  },

  timeText: {
    color: '#808080',
    fontSize: 12 * height_ratio,
    fontWeight: '400',
  },

  targetText: {
    color: '#808080',
    fontSize: 12 * height_ratio,
    fontWeight: '400',
  },

  titleText: {
    color: '#242424',
    fontSize: 16 * height_ratio,
    fontWeight: '400',
    marginBottom: 4 * height_ratio,
    marginTop: 16 * height_ratio,
  },

  exerciseInformation: {
    fontSize: 14 * height_ratio,
    fontWeight: '400',
    color: '#242424',
  },
});

export default styles;