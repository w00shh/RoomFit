import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  setContainer: {
    flexDirection: 'row',
    alignItems: 'space-between',
  },

  titleKey: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    paddingVertical: 0,
    paddingHorizontal: 8,
  },

  titleText: {
    fontSize: 12,
  },

  titleItem: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    paddingVertical: 0,
    paddingHorizontal: 8,
  },

  keyBox: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    paddingVertical: 0,
    paddingHorizontal: 8,
    backgroundColor: '#f5f5f5',
  },
  itemBox: {
    flex: 2,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 4,
    paddingVertical: 0,
    paddingHorizontal: 8,
    backgroundColor: '#f5f5f5',
  },

  valueText: {
    fontSize: 16,
    color: '#242424',
  },

  unitText: {
    fontSize: 12,
    color: '#acacac',
    margin: 4,
  },
  modeText: {
    fontSize: 12,
    color: '#242424',
  },
  modeTitleContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },

  titleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#242424',
  },
});

export default styles;
