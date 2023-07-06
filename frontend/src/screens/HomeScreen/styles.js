import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;
const standard_w = 390;
const standard_h = 797;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 16 * height_ratio,
    paddingHorizontal: 16 * width_ratio,
    backgroundColor: 'white',
  },

  connectedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',

    width: 358 * width_ratio,
    height: 168 * height_ratio,
    borderRadius: 24,
    paddingVertical: 40 * height_ratio,
  },

  noConnectionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#242424',
    marginTop: 24 * height_ratio,
  },

  noConnectionText2: {
    fontSize: 14,
    fontWeight: '400',
    color: '#808080',
    marginTop: 3 * height_ratio,
  },

  connectButton: {
    marginBottom: 16 * height_ratio,
  },

  subtitleText: {
    alignSelf: 'flex-start',
    fontWeight: '700',
    fontSize: 20,

    color: '#242424',

    marginTop: 20 * height_ratio,
  },

  routineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

    width: 358 * width_ratio,
    height: 168 * height_ratio,
    borderRadius: 24,
    paddingVertical: 40 * height_ratio,

    marginTop: 20 * height_ratio,
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
    marginTop: 3 * height_ratio,
  },

  makeRoutineButton: {
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#fff',

    width: 97 * width_ratio,
    height: 39 * height_ratio,

    borderRadius: 8,
    padding: 0,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    borderStyle: 'solid',

    marginVertical: 24 * height_ratio,
  },

  allRoutine: {
    marginTop: 32 * height_ratio,
  },
  navigator: {
    position: 'absolute',
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 100,
    width: 358 * width_ratio,
    height: 64 * height_ratio,
    bottom: 29 * height_ratio,
  },
});

export default styles;
