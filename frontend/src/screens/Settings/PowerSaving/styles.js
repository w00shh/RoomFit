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
    paddingVertical: 12 * height_ratio,
    width: 358 * width_ratio,
  },
  restChecker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16 * width_ratio,
  },
});

export default styles;
