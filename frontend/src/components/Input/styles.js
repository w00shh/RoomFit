import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    width: 358 * width_ratio,
    paddingTop: 8 * height_ratio,
    marginVertical: 8 * height_ratio,
    paddingHorizontal: 16 * width_ratio,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },

  label: {
    color: '#808080',
    fontSize: 12,
  },

  inputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default styles;
