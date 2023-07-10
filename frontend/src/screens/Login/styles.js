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

  selectionContainer: {
    flexDirection: 'row',
    alignItems: 'space-between',
    marginVertical: 8 * height_ratio,
  },

  selectionBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectionText: {
    fontSize: 14 * height_ratio,
    color: '#242424',
  },

  divider: {
    height: 20 * height_ratio,
  },

  toRegister: {
    flexDirection: 'row',
    marginVertical: 200 * height_ratio,
  },
  questionText: {
    marginHorizontal: 4 * width_ratio,
    fontSize: 14 * height_ratio,
    color: '#808080',
  },
  registerText: {
    marginHorizontal: 4,
    fontSize: 14 * height_ratio,
    color: '#242424',
  },
});

export default styles;
