import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  setContainer: {
    flexDirection: 'row',
    alignItems: 'space-between',
  },

  titleKey: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4 * height_ratio,
    marginHorizontal: 4 * width_ratio,
    paddingVertical: 0,
    paddingHorizontal: 8 * width_ratio,
  },

  titleText: {
    fontSize: 12 * height_ratio,
  },

  titleItem: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4 * height_ratio,
    marginHorizontal: 4 * width_ratio,
    paddingVertical: 0,
    paddingHorizontal: 8 * width_ratio,
  },
  keyBox: {
    flex: 1,
    height: 40 * height_ratio,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4 * height_ratio,
    marginHorizontal: 4 * width_ratio,
    paddingVertical: 0,
    paddingHorizontal: 8 * width_ratio,
    backgroundColor: '#f5f5f5',
  },
  keyText: {
    fontSize: 16 * height_ratio,
    color: '#242424',
    textAlign: 'center',
  },
  itemBox: {
    flex: 2,
    height: 40 * height_ratio,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 4 * height_ratio,
    marginHorizontal: 4 * width_ratio,
    paddingVertical: 0,
    paddingHorizontal: 8 * width_ratio,
    backgroundColor: '#f5f5f5',
  },

  valueText: {
    flex: 3,
    fontSize: 16 * height_ratio,
    color: '#242424',
    textAlign: 'center',
  },
  unitContainer: {
    flex: 1,
  },

  unitText: {
    fontSize: 12 * height_ratio,
    color: '#acacac',
  },
  modeText: {
    fontSize: 12 * height_ratio,
    color: '#242424',
  },
  modeTitleContainer: {
    alignItems: 'center',
    paddingVertical: 24 * height_ratio,
  },

  titleText: {
    fontSize: 16 * height_ratio,
    fontWeight: '700',
    color: '#242424',
  },
});

export default styles;
