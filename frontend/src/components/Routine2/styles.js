import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  routineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',

    paddingHorizontal: 16 * width_ratio,
    paddingVertical: 16 * height_ratio,

    width: 358 * width_ratio,
    height: 74 * height_ratio,
    borderRadius: 8,
  },

  titleText: {
    color: '#242424',
    fontSize: 16 * height_ratio,
    fontWeight: '400',
  },

  targetText: {
    color: '#808080',
    fontSize: 12 * height_ratio,
    fontWeight: '400',
  },

  rightIcon: {
    marginRight: 16 * width_ratio,
    backgroundColor: '#f5f5f5',
  },
});

export default styles;
