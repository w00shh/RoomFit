import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  recordItemContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recordInfoContainer: {
    flexDirection: 'row',
    gap: 16 * width_ratio,
  },
  imageContainer: {
    width: 48 * width_ratio,
    height: 48 * height_ratio,
    backgroundColor: '#808080',
  },

  recordDetailContainer: {
    flexDirection: 'column',
  },
  koreanText: {
    fontSize: 14 * height_ratio,
    color: '#242424',
  },
  englishText: {
    fontSize: 14 * height_ratio,
    color: '#808080',
  },
  setInfoContainer: {
    flexDirection: 'column',
    gap: 8 * height_ratio,
  },
  aiCoachingContainer: {
    flexDirection: 'row',
    backgroundColor: '#5252fa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12 * height_ratio,
    paddingRight: 8 * width_ratio,
    paddingLeft: 12 * width_ratio,
    borderRadius: 100,
  },

  aiCoachingText: {
    color: '#fff',
    fontSize: 13 * height_ratio,
    marginRight: 2 * width_ratio,
  },
  rightIcon: {
    color: '#fff',
    marginLeft: 2 * width_ratio,
  },
});

export default styles;
