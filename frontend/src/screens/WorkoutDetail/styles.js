import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
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

  pauseMotionTitle: {
    fontSize: 16,
    fontWeight: '400',
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
});

export default styles;
