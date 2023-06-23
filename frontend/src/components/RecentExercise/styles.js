import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  performedContainer: {
    marginTop: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',

    backgroundColor: '#f5f5f5',

    width: 358,
    height: 112,
    borderRadius: 24,
  },

  targetContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  timeText: {
    color: '#808080',
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 16,
    marginTop: 2,
  },

  targetText: {
    color: '#808080',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 2,
  },

  titleText: {
    color: '#242424',
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 16,
    marginBottom: 4,
    marginTop: 16,
  },

  exerciseInformation: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '400',
    color: '#242424',
  },
});

export default styles;
