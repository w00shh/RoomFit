import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  setInfoContainer: {
    flexDirection: 'row',
    gap: 8 * width_ratio,
  },
  setNumberContainer: {
    paddingVertical: 4 * height_ratio,
    paddingHorizontal: 4 * width_ratio,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 2 * width_ratio,
  },
  setNumberText: {
    fontSize: 13 * height_ratio,
    color: '#808080',
  },
  setDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8 * width_ratio,
  },
  valueText: {
    fontSize: 13,
    color: '#242424',
  },
  unitText: {
    fontSize: 13 * height_ratio,
    color: '#808080',
  },
});

export default styles;
