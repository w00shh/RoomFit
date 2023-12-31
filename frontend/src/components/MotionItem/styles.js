import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  motionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 358 * width_ratio,
    height: 48 * height_ratio,
    padding: 0,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8 * width_ratio,
    padding: 0,
  },

  imageContainer: {
    width: 48 * width_ratio,
    height: 48 * height_ratio,
  },

  nameContainer: {
    flexDirection: 'column',
  },

  koreanText: {
    fontSize: 14 * height_ratio,
    color: '#242424',
  },
  englishText: {
    fontSize: 12 * height_ratio,
    color: '#808080',
  },
});

export default styles;
