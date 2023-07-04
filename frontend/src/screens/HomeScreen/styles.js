import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },

  connectedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',

    width: 358,
    height: 168,
    borderRadius: 24,
    paddingVertical: 40,
  },

  noConnectionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#242424',
    marginTop: 24,
  },

  noConnectionText2: {
    fontSize: 14,
    fontWeight: '400',
    color: '#808080',
    marginTop: 3,
  },

  connectButton: {
    marginBottom: 16,
  },

  subtitleText: {
    alignSelf: 'flex-start',
    fontWeight: '700',
    fontSize: 20,

    color: '#242424',

    marginTop: 20,
    marginLeft: 16,
  },

  routineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

    width: 358,
    height: 168,
    borderRadius: 24,
    paddingVertical: 40,

    marginTop: 20,
  },

  noRoutineText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#808080',
  },

  noRoutineText2: {
    fontSize: 14,
    fontWeight: '400',
    color: '#808080',
    marginTop: 3,
  },

  makeRoutineButton: {
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#fff',

    width: 97,
    height: 39,

    borderRadius: 8,
    padding: 0,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    borderStyle: 'solid',

    marginVertical: 24,
  },

  allRoutine: {
    marginTop: 32,
    marginRight: 16,
  },
  navigator: {
    position: 'absolute',
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 100,
    width: 358,
    height: 64,
    bottom: 20,
  },
});

export default styles;
