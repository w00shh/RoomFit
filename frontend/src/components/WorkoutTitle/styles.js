import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  workoutTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 358,
    height: 48,
    padding: 0,
    marginVertical: 16,
  },

  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'grey',
    marginHorizontal: 10,
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
    width: 48,
  },
});

export default styles;
