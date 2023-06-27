import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  motionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 358,
    height: 48,
    padding: 0,
    marginVertical: 16,
  },

  imageContainer: {
    width: 48,
    height: 48,

    marginHorizontal: 10,
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
