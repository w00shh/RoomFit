import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
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
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'stretch',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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

  modeItemContainer: {
    flexDirection: 'column',
    height: 72 * height_ratio,
    paddingVertical: 12 * height_ratio,
    paddingHorizontal: 12 * width_ratio,
    marginVertical: 4 * height_ratio,
    marginHorizontal: 4 * width_ratio,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },

  modeText: {
    fontSize: 16 * height_ratio,
    color: '#242424',
  },
  descriptionText: {
    fontSize: 13 * height_ratio,
    color: '#acacac',
  },
  modeButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    padding: 0,
    backgroundColor: '#ffffff',
  },

  modeButton: {
    flex: 1,
    justifyContent: 'center',
  },
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16 * height_ratio,
    paddingHorizontal: 16 * width_ratio,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    margin: 0,
    padding: 0,
  },
  buttonSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#5252fa',
  },
  addText: {
    fontSize: 14 * height_ratio,
    color: 'white',
  },
  startButton: {
    width: 171 * width_ratio,
    backgroundColor: 'white',
  },
  startText: {
    fontSize: 14 * height_ratio,
    color: '#52525fa',
  },
});

export default styles;
