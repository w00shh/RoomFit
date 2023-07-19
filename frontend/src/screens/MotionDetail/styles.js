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
    gap: 16 * height_ratio,
  },
  targetContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    gap: 16 * height_ratio,
  },
  detailContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    gap: 16 * height_ratio,
  },
  titleText: {
    fontSize: 20 * height_ratio,
    color: '#242424',
    fontWeight: '700',
  },
  targetBox: {
    paddingVertical: 8 * height_ratio,
    paddingHorizontal: 12 * width_ratio,
    backgroundColor: '#f5f5f5',
    borderRadius: 8 * height_ratio,
  },
  targetText: {
    color: '#242424',
    fontSize: 14 * height_ratio,
  },
  descriptionText: {
    fontSize: 12 * height_ratio,
    color: '#242424',
  },
});

export default styles;
