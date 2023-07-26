import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16 * height_ratio,
    paddingHorizontal: 16 * width_ratio,
    backgroundColor: 'white',
  },
  nameContainer: {
    width: 358 * width_ratio,
    height: 56 * height_ratio,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16 * width_ratio,
    borderRadius: 8,
    fontSize: 16 * height_ratio,
  },
  selectContainer: {
    width: 358 * width_ratio,
    height: 56 * height_ratio,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16 * width_ratio,
    borderRadius: 8,
    marginTop: 16 * height_ratio,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
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
    // height: 610 * height_ratio,
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
    padding: 16 * height_ratio,
    backgroundColor: '#ffffff',
  },
  restContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16 * width_ratio,
  },
  restChecker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16 * width_ratio,
  },
});

export default styles;
