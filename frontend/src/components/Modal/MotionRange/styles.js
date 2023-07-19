import {DefaultTheme} from '@react-navigation/native';
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

  motionRangeContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'stretch',
    borderTopLeftRadius: 24 * height_ratio,
    borderTopRightRadius: 24 * height_ratio,
    gap: 12 * height_ratio,
  },

  titleContainer: {
    alignItems: 'center',
    paddingTop: 24 * height_ratio,
  },

  titleText: {
    fontSize: 16 * height_ratio,
    fontWeight: '700',
    color: '#242424',
  },

  descriptionContainer: {
    flexDirection: 'column',
    gap: 2 * height_ratio,
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 13 * height_ratio,
    color: '#808080',
  },

  radioContainer: {
    flexDirection: 'row',
    gap: 12 * width_ratio,
    alignItems: 'center',
    paddingHorizontal: 16 * width_ratio,
    marginVertical: 12 * height_ratio,
  },

  radioText: {
    fontSize: 16 * height_ratio,
    color: '#242424',
  },

  autoContainer: {
    flexDirection: 'row',
    gap: 8 * width_ratio,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 16 * width_ratio,
    paddingVertical: 0,
  },

  rangeInputContainer: {
    flexDirection: 'row',
    width: 168 * width_ratio,
    height: 56 * height_ratio,
    borderRadius: 4 * height_ratio,
    paddingHorizontal: 12 * width_ratio,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    flex: 4,
    height: 56 * height_ratio,
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
    color: '#808080',
    fontSize: 16 * height_ratio,
  },

  placeholderText: {
    flex: 1,
    fontSize: 12 * height_ratio,
    color: '#808080',
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16 * width_ratio,
    justifyContent: 'space-around',
    paddingHorizontal: 16 * width_ratio,
    paddingVertical: 16 * height_ratio,
    backgroundColor: '#ffffff',
  },
  motionRangeButton: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default styles;
