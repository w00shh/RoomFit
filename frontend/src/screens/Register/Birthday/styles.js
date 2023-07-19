import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16 * width_ratio,
    backgroundColor: 'white',
  },
  restContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 358 * width_ratio,
  },
  restChecker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16 * width_ratio,
  },

  explainText: {
    fontSize: 20 * height_ratio,
    color: '#242424',
    fontWeight: '700',
  },

  birthBox: {
    width: 358 * width_ratio,
    height: 56 * height_ratio,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16 * width_ratio,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  birthText: {
    fontSize: 16 * height_ratio,
    color: '#242424',
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'white',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 0,
  },

  modeContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'stretch',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 384 * height_ratio,
    flex: 1,
  },

  modeTitleContainer: {
    alignItems: 'center',
    paddingVertical: 24 * height_ratio,
  },

  titleText: {
    fontSize: 16 * height_ratio,
    fontWeight: '700',
    color: '#242424',
  },
  modeButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    padding: 0,
    backgroundColor: '#ffffff',
  },
});

export default styles;
