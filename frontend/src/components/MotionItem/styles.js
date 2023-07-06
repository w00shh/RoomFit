import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  motionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 358 * width_ratio,
    height: 48 * height_ratio,
    padding: 0,
    marginVertical: 16 * height_ratio,
  },

  imageContainer: {
    width: 48 * width_ratio,
    height: 48 * height_ratio,

    marginHorizontal: 10 * width_ratio,
  },

  nameContainer: {
    flexDirection: 'column',
  },

  koreanText: {
    fontSize: 14,
    color: '#242424',
  },
  englishText: {
    fontSize: 12,
    color: '#808080',
  },
});

export default styles;
