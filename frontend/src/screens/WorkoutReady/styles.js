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
  buttonContainer: {
    width: 390,
    height: 88,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    padding: 16,
  },
  buttonSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#5252fa',
  },
  addText: {
    color: 'white',
  },
  startButton: {
    width: 171,
    backgroundColor: 'white',
  },
  startText: {
    color: '#52525fa',
  },
});

export default styles;
