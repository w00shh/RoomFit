import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

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
    borderRadius: 16 * height_ratio,
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
    marginVertical: 8 * height_ratio,
  },

  titleText: {
    fontSize: 16 * height_ratio,
    fontWeight: '700',
    color: '#242424',
  },

  descriptionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1 * height_ratio,
  },

  descriptionText: {
    fontSize: 14 * height_ratio,
    color: '#242424',
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

  pauseMotionTitle: {
    fontSize: 16 * height_ratio,
    fontWeight: '700',
    color: '#242424',
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
    marginBottom: 1 * height_ratio,
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

  yoyakText: {
    fontSize: 16 * height_ratio,
    fontWeight: '700',
    color: '#242424',
    marginBottom: 24 * height_ratio,
  },

  memoContainer: {
    backgroundColor: '#f5f5f5',
    alignSelf: 'stretch',
    paddingHorizontal: 16 * width_ratio,
    paddingVertical: 16 * height_ratio,
    borderRadius: 8,
  },
});

export default styles;
