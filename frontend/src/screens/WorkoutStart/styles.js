import {StyleSheet, Dimensions, Platform} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 16 * width_ratio,
    paddingHorizontal: 16 * width_ratio,
    backgroundColor: 'white',
  },
  devider: {
    marginTop: 18 * height_ratio,
    height: 8 * height_ratio,
  },

  devider2: {
    marginTop: 24,
    height: 8,
  },

  motion_name: {
    marginTop: 25 * height_ratio,
    color: '#242424',
    fontSize: 20,
    fontWeight: '400',
  },

  statusText: {
    fontSize: 48 * height_ratio,
    fontWeight: '400',
    color: '#242424',
  },

  targetText: {
    fontSize: 16 * height_ratio,
    fontWeight: '400',
    color: '#808080',
    marginBottom: 10 * height_ratio,
  },

  statusText2: {
    fontSize: 16 * height_ratio,
    fontWeight: '700',
    color: '#242424',
  },

  targetText2: {
    fontSize: 12 * height_ratio,
    fontWeight: '400',
    color: '#808080',
    marginBottom: 1,
  },

  CButton: {
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#fff',

    width: 56 * width_ratio,
    height: 56 * height_ratio,

    borderRadius: 8,
    padding: 0,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    borderStyle: 'solid',

    marginTop: 16 * height_ratio,
    marginRight: 12 * width_ratio,
  },

  CButton2: {
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#fff',

    width: 222 * width_ratio,
    height: 56 * height_ratio,

    borderRadius: 8,
    padding: 0,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    borderStyle: 'solid',

    marginTop: 16 * height_ratio,
  },

  CText: {
    fontWeight: '400',
    fontSize: 14 * height_ratio,
    textAlign: 'center',
    color: '#242424',
  },

  CButton3: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#5252fa',

    width: 358 * width_ratio,
    height: 56 * height_ratio,

    marginTop: 12 * height_ratio,
    borderRadius: 8,
    padding: 0,
  },
  CText3: {
    fontWeight: '400',
    fontSize: 14 * height_ratio,
    textAlign: 'center',
    color: '#fff',
  },
  timer: {
    fontSize: 48 * height_ratio,
    color: '#242424',
  },

  pauseTitle: {
    fontSize: 28 * height_ratio,
    fontWeight: '700',
    color: '#242424',
  },

  pauseMotionTitle: {
    fontSize: 16 * height_ratio,
    fontWeight: '400',
    color: '#242424',
  },

  pauseSubtitle: {
    fontSize: 12 * height_ratio,
    fontWeight: '400',
    color: '#808080',
  },

  pauseSubcontent: {
    fontSize: 16 * height_ratio,
    fontWeight: '700',
    color: '#242424',
  },

  grayCircle: {
    width: 48 * width_ratio,
    height: 48 * width_ratio,

    backgroundColor: '#f5f5f5',
    borderRadius: 24,

    alignItems: 'center',
    justifyContent: 'center',
  },

  RgrayCircle: {
    width: 48 * width_ratio,
    height: 48 * width_ratio,

    backgroundColor: '#f5f5f5',
    borderRadius: 24,

    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 60 * width_ratio,
  },

  endButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

    backgroundColor: '#242424',

    width: 171 * width_ratio,
    height: 56 * height_ratio,

    borderRadius: 8,
    padding: 0,

    marginTop: 16 * height_ratio,
    marginRight: 16 * width_ratio,
  },

  restartButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

    backgroundColor: '#5252fa',

    width: 171 * width_ratio,
    height: 56 * height_ratio,

    borderRadius: 8,
    padding: 0,

    marginTop: 16 * height_ratio,
  },

  tutText: {
    fontWeight: '700',
    fontSize: 20 * height_ratio,
    color: '#808080',
  },

  navigator: {
    backgroundColor: '#5252fa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    width: 358 * width_ratio,
    height: 64 * height_ratio,
    marginTop: 10 * height_ratio,
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
    marginTop: 35 * height_ratio,
    paddingHorizontal: Platform.OS === 'ios' ? 16 * width_ratio : 0,

    flex: 1,
  },

  settingText: {
    fontSize: 16 * height_ratio,
    fontWeight: '400',
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
    height: 500 * height_ratio,
    flex: 1,
  },

  modeTitleContainer: {
    alignItems: 'center',
    paddingVertical: 24 * height_ratio,
  },

  titleText: {
    fontSize: 16 * height_ratio,
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
    fontSize: 16 * height_ratio,
    color: '#242424',
  },
  descriptionText: {
    fontSize: 13 * height_ratio,
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
    marginLeft: 16 * width_ratio,
  },
  restChecker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16 * width_ratio,
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
    width: 296 * width_ratio,
    height: 296 * height_ratio,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 12,
  },

  restingTitle: {
    fontSize: 16 * height_ratio,
    fontWeight: '700',
    color: '#242424',
    marginTop: 30 * height_ratio,
  },

  restingTimer: {
    fontSize: 48 * height_ratio,
    color: '#242424',
    marginTop: 16 * height_ratio,
  },

  plusminus: {
    fontSize: 16 * height_ratio,
    color: '#242424',
  },

  endingContainer: {
    width: 296 * width_ratio,
    height: 189 * height_ratio,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 12,
  },

  endingContainer2: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16 * width_ratio,
  },

  memoContainer: {
    width: 296 * width_ratio,
    height: 350 * height_ratio,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 12,
  },

  titleInput: {
    fontSize: 14 * height_ratio,
    backgroundColor: '#f5f5f5',
    width: 264 * width_ratio,
    height: 56 * height_ratio,
    marginTop: 20 * height_ratio,
    paddingHorizontal: 12 * width_ratio,
    borderRadius: 8,
  },

  memoInput: {
    fontSize: 14 * height_ratio,
    backgroundColor: '#f5f5f5',
    width: 264 * width_ratio,
    height: 110 * height_ratio,
    marginTop: 18 * height_ratio,
    paddingHorizontal: 12 * width_ratio,
    borderRadius: 8,
  },
  motionTitle: {
    fontSize: 28 * height_ratio,
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
    paddingVertical: 24 * height_ratio,
  },

  titleText5: {
    fontSize: 16 * height_ratio,
    fontWeight: '700',
    color: '#242424',
  },

  modeItemContainer: {
    flexDirection: 'column',
    height: 72 * height_ratio,
    paddingVertical: 12 * height_ratio,
    paddingHorizontal: 12 * width_ratio,
    marginVertical: 4 * height_ratio,
    marginHorizontal: 4 * width_ratio,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },

  modeText: {
    fontSize: 16 * height_ratio,
    color: '#242424',
  },
  descriptionText: {
    fontSize: 13 * height_ratio,
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
    paddingVertical: 16 * height_ratio,
    paddingHorizontal: 16 * width_ratio,
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
