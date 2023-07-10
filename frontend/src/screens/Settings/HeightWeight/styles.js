import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 763;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16 * width_ratio,
    backgroundColor: 'white',
  },
  inputContainer: {
    width: 358 * width_ratio,
    height: 56 * height_ratio,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingVertical: 16 * height_ratio,
    paddingHorizontal: 16 * width_ratio,
    marginTop: 16 * height_ratio,
    textAlign: 'center',
    fontSize: 16 * height_ratio,
  },
  placeholder: {
    position: 'absolute',
    top: 35 * height_ratio,
    right: 20 * width_ratio,
  },
  placeholderText: {
    fontSize: 12 * height_ratio,
    color: '#808080',
  },
});

export default styles;
