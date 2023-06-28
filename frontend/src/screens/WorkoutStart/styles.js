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
    marginTop: 25,
    color: '#242424',
    fontSize: 20,
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

  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'white',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 0,
  },

  modeContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'stretch',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 500,
    flex: 1,
  },

  modeTitleContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },

  titleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#242424',
  },

  modeItemContainer: {
    flexDirection: 'column',

    padding: 12,
    margin: 4,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },

  modeText: {
    fontSize: 16,
    color: '#242424',
  },
  descriptionText: {
    fontSize: 13,
    color: '#acacac',
  },
  modeButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    padding: 0,
    backgroundColor: '#ffffff',
  },
  restContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  restChecker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  rests: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 56,
  },

  modalContainer2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 0,
  },

  restingContainer: {
    width: 296,
    height: 296,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 12,
  },

  restingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#242424',
    marginTop: 30,
  },

  restingTimer: {
    fontSize: 48,
    color: '#242424',
    marginTop: 16,
  },

  plusminus: {
    fontSize: 16,
    color: '#242424',
  },

  endingContainer: {
    width: 296,
    height: 189,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 12,
  },

  memoContainer: {
    width: 296,
    height: 350,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 12,
  },

  titleInput: {
    backgroundColor: '#f5f5f5',
    width: 264,
    height: 56,
    marginTop: 20,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  memoInput: {
    backgroundColor: '#f5f5f5',
    width: 264,
    height: 110,
    marginTop: 18,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  motionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#242424',
  },
  modalContainer5: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'white',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 0,
  },

  modeContainer5: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'stretch',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  modeTitleContainer5: {
    alignItems: 'center',
    paddingVertical: 24,
  },

  titleText5: {
    fontSize: 16,
    fontWeight: '700',
    color: '#242424',
  },

  modeItemContainer: {
    flexDirection: 'column',
    height: 72,
    padding: 12,
    margin: 4,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },

  modeText: {
    fontSize: 16,
    color: '#242424',
  },
  descriptionText: {
    fontSize: 13,
    color: '#acacac',
  },
  modeButtonContainer5: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    padding: 0,
    backgroundColor: '#ffffff',
  },

  modeButton: {
    flex: 1,
    justifyContent: 'center',
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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    margin: 0,
    padding: 0,
  },
});

export default styles;
