import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  routineContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',

    width: 358,
    height: 74,
    borderRadius: 8,
  },

  titleText: {
    color: '#242424',
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 16,
    marginBottom: 4,
  },

  targetText: {
    color: '#808080',
    fontSize: 12,
    fontWeight: '400',
  },

  rightIcon: {
    marginRight: 16,
    backgroundColor: '#f5f5f5',
  },
});

export default styles;
