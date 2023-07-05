import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

const styles = StyleSheet.create({
  performedContainer: {
    marginTop: 16 * height_ratio,
    flexDirection: 'column',
    alignItems: 'flex-start',

    backgroundColor: '#f5f5f5',

    width: 358 * width_ratio,
    height: 112 * height_ratio,
    borderRadius: 8,
  },

  targetContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  timeText: {
    color: '#808080',
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 16 * width_ratio,
    marginTop: 2 * height_ratio,
  },

  targetText: {
    color: '#808080',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 2 * height_ratio,
  },

  titleText: {
    color: '#242424',
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 16 * width_ratio,
    marginBottom: 4 * height_ratio,
    marginTop: 16 * height_ratio,
  },

  exerciseInformation: {
    marginLeft: 6 * width_ratio,
    fontSize: 14,
    fontWeight: '400',
    color: '#242424',
  },
});

export default styles;
