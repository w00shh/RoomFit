import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16 * height_ratio,
    paddingHorizontal: 16 * width_ratio,
    backgroundColor: 'white',
  },
  titleContainer: {
    marginBottom: 32 * height_ratio,
    alignSelf: 'flex-start',
  },
  titleText: {
    fontWeight: '700',
    fontSize: 20 * height_ratio,
  },
  toLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16 * height_ratio,
  },
  questionText: {
    marginHorizontal: 4 * width_ratio,
    fontSize: 14 * height_ratio,
    color: '#808080',
  },
  loginText: {
    marginHorizontal: 4 * width_ratio,
    fontSize: 14 * height_ratio,
    color: '#242424',
  },
});

export default styles;
