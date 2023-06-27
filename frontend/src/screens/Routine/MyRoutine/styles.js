import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  makeRoutineContainer: {
    width: 358,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#dfdfdf',
    borderRadius: 8,

    marginVertical: 24,
  },
  makeRoutineText: {
    fontSize: 14,
    color: '#5252fa',
  },
  deleteRoutineContainer: {
    width: 358,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5252fa',
    borderRadius: 8,

    marginVertical: 24,
  },
  deleteRoutineText: {
    fontSize: 14,
    color: 'white',
  },
  routineContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',

    width: 318,
    height: 74,
    borderRadius: 8,
    marginLeft: 8,
  },

  titleText: {
    color: '#242424',
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 16,
    marginBottom: 4,
  },

  targetText: {
    color: '#808080',
    fontSize: 12,
    fontWeight: '400',
  },

  rightIcon: {
    marginRight: 16,
    backgroundColor: '#f5f5f5',
  },
  checkBox: {
    backgroundColor: '#dfdfdf',
    width: 24,
    height: 24,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default styles;
