import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',

    backgroundColor: 'white',
    gap: 12 * height_ratio,
  },
  makeRoutineContainer: {
    width: 358 * width_ratio,
    height: 56 * height_ratio,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#dfdfdf',
    borderRadius: 8,
  },
  makeRoutineText: {
    fontSize: 14 * height_ratio,
    color: '#5252fa',
  },
  deleteRoutineContainer: {
    width: 358 * width_ratio,
    height: 56 * height_ratio,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5252fa',
    borderRadius: 8,
    marginVertical: 24 * height_ratio,
  },
  deleteRoutineText: {
    fontSize: 14 * height_ratio,
    color: 'white',
  },
  routineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 16 * width_ratio,
    paddingVertical: 16 * height_ratio,

    backgroundColor: '#f5f5f5',

    width: 318 * width_ratio,
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
  checkBox: {
    backgroundColor: '#dfdfdf',
    width: 24 * width_ratio,
    height: 24 * height_ratio,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16 * height_ratio,
  },
});

export default styles;
