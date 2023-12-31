import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  workoutTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: 358 * width_ratio,
    height: 48 * height_ratio,
  },

  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8 * width_ratio,
  },
  imageContainer: {
    width: 48 * width_ratio,
    height: 48 * height_ratio,
  },

  nameContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  koreanText: {
    fontSize: 14 * height_ratio,
    color: '#242424',
  },
  englishText: {
    fontSize: 12 * height_ratio,
    color: '#808080',
  },
  rangeText: {
    fontSize: 12 * height_ratio,
    color: '#808080',
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48 * width_ratio,
    height: 48 * height_ratio,
  },
});

export default styles;
