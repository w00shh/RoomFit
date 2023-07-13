import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 16 * height_ratio,
    paddingHorizontal: 16 * width_ratio,
    backgroundColor: 'white',
  },
  navigator: {
    position: 'absolute',
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 100,
    width: 358 * width_ratio,
    height: 64 * height_ratio,
    bottom: 29 * height_ratio,
  },

  Calendar: {
    borderBottomWidth: 8,
    borderBottomColor: '#f5f5f5',
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
  },

  pauseMotionTitle: {
    fontSize: 16,
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

  yoyakText: {
    fontSize: 16 * height_ratio,
    fontWeight: '700',
    color: '#242424',
    alignSelf: 'flex-start',
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

  targetText: {
    fontSize: 14 * height_ratio,
    color: '#808080',
  },
  percentText: {
    fontSize: 16 * height_ratio,
    color: '#242424',
    fontWeight: '700',
  },
});

export default styles;
