import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  setContainer: {
    flexDirection: 'row',
    gap: 8 * width_ratio,
  },

  titleKey: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  titleText: {
    fontSize: 12 * height_ratio,
  },

  titleItem: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: 12 * width_ratio,
  },
  keyBox: {
    flex: 1,
    width: 48 * width_ratio,
    height: 40 * height_ratio,
    borderRadius: 4 * height_ratio,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  keyText: {
    fontSize: 16 * height_ratio,
    color: '#242424',
    textAlign: 'center',
  },
  itemBox: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    paddingHorizontal: 12 * width_ratio,

    height: 40 * height_ratio,
    borderRadius: 4 * height_ratio,

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
