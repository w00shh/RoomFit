import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },

  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  newRoutineContainer: {
    marginVertical: 120,
  },
  newRoutineText: {
    fontSize: 14,
    color: '#808080',
  },
  addMotionContainer: {
    width: 358,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#dfdfdf',
    borderRadius: 8,
  },
  addMotionText: {
    fontSize: 14,
    color: '#5252fa',
  },
  routineNameContainer: {
    width: 296,
    height: 224,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'white',
  },

  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },

  titleText: {
    fontWeight: '700',
    fontSize: 16,
  },

  inputContainer: {
    width: 264,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  routineNameInput: {
    fontSize: 16,
  },
  confirmButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5252fa',
    width: 264,
    height: 56,
    borderRadius: 8,
    padding: 0,
  },

  confirmText: {
    fontSize: 14,
    color: 'white',
  },
});

export default styles;
