import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16 * width_ratio,
  },
  image: {
    width: 80 * width_ratio,
    height: 211 * height_ratio,
  },
});

export default styles;
