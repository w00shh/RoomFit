import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

const styles = StyleSheet.create({
  CText: {
    fontWeight: '400',
    fontSize: 14 * height_ratio,
    textAlign: 'center',
    color: '#fff',
  },
});

export default styles;
