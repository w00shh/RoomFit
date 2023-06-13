import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  setContainer: {
    flexDirection: 'row',
    alignItems: 'space-between',
  },
  keyBox: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 0,
    background: '#f5f5f5',
  },
  itemBox: {
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 0,
    background: '#f5f5f5',
    boxSizing: 'border-box',
  },

  valueText: {
    fontSize: 16,
    color: '#242424',
    margin: 10,
  },

  unitText: {
    fontSize: 12,
    color: '#acacac',
  },
});

export default styles;
