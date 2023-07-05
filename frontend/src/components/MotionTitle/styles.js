import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

const styles = StyleSheet.create({
  motionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 358 * width_ratio,
    height: 48 * height_ratio,
    padding: 0,
    marginVertical: 16 * height_ratio,
  },

  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    width: 48 * width_ratio,
    height: 48 * height_ratio,

    marginHorizontal: 10 * width_ratio,
  },

  nameContainer: {
    flexDirection: 'column',
  },

  koreanText: {
    fontSize: 14,
    color: '#242424',
  },
  rangeText: {
    fontSize: 12,
    color: '#808080',
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48 * width_ratio,
  },
});

export default styles;
