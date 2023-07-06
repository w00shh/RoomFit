import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 16 * width_ratio,
    paddingHorizontal: 16 * height_ratio,
    backgroundColor: 'white',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  workoutDeleteContainer: {
    width: 292 * width_ratio,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#fff',
  },

  modalTopContainer: {
    height: 32 * height_ratio,
  },

  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16 * height_ratio,
  },

  titleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#242424',
  },

  descriptionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2 * height_ratio,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    paddingVertical: 16 * height_ratio,
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

  pauseMotionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#242424',
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
    marginBottom: 10 * height_ratio,
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
    marginBottom: 1 * height_ratio,
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

  yoyakText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#242424',
  },

  memoContainer: {
    backgroundColor: '#f5f5f5',
    alignSelf: 'stretch',
    paddingHorizontal: 16 * width_ratio,
    paddingVertical: 16 * height_ratio,
    borderRadius: 8,
    marginTop: 24 * height_ratio,
    height: 74 * height_ratio,
  },
});

export default styles;
