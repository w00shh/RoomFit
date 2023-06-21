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
  devider: {
    marginTop: 18,
    height: 8,
  },

  devider2: {
    marginTop: 24,
    height: 8,
  },

  motionName: {
    marginTop: 32,
    color: '#242424',
    fontSize: 16,
    fontWeight: '400',
  },

  statusText: {
    fontSize: 48,
    fontWeight: '400',
    color: '#242424',
  },

  targetText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#808080',
    marginBottom: 10,
  },

  statusText2: {
    fontSize: 16,
    fontWeight: '700',
    color: '#242424',
  },

  targetText2: {
    fontSize: 12,
    fontWeight: '400',
    color: '#808080',
    marginBottom: 1,
  },

  CButton: {
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#fff',

    width: 56,
    height: 56,

    borderRadius: 8,
    padding: 0,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    borderStyle: 'solid',

    marginTop: 16,
    marginRight: 12,
  },

  CButton2: {
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#fff',

    width: 222,
    height: 56,

    borderRadius: 8,
    padding: 0,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    borderStyle: 'solid',

    marginTop: 16,
  },

  CText: {
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    color: '#242424',
  },

  CButton3: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#5252fa',

    width: 358,
    height: 56,

    marginTop: 12,
    borderRadius: 8,
    padding: 0,
  },
  CText3: {
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
  },
  timer: {
    fontSize: 48,
    color: '#242424',
  },

  pauseTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#242424',
    marginLeft: 16,
  },

  pauseMotionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#242424',
  },

  puaseSubtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#808080',
  },

  puaseSubcontent: {
    fontSize: 16,
    fontWeight: '700',
    color: '#242424',
  },

  grayCircle: {
    width: 48,
    height: 48,

    backgroundColor: '#f5f5f5',
    borderRadius: 24,

    alignItems: 'center',
    justifyContent: 'center',
  },

  RgrayCircle: {
    width: 48,
    height: 48,

    backgroundColor: '#f5f5f5',
    borderRadius: 24,

    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 60,
  },

  endButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

    backgroundColor: '#242424',

    width: 171,
    height: 56,

    borderRadius: 8,
    padding: 0,

    marginTop: 16,
    marginRight: 16,
  },

  restartButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

    backgroundColor: '#5252fa',

    width: 171,
    height: 56,

    borderRadius: 8,
    padding: 0,

    marginTop: 16,
  },

  tutText: {
    fontWeight: '700',
    fontSize: 20,
    color: '#808080',
  },

  navigator: {
    backgroundColor: '#5252fa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    width: 358,
    height: 64,
    marginTop: 10,
  },

  settings: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    width: '100%',
  },

  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35,
    flex: 1,
  },

  settingText: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 16,
    color: '#242424',
  },
});

export default styles;
