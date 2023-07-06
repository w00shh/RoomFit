import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

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
  searchContainer: {
    width: 358 * width_ratio,
    height: 56 * height_ratio,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16 * width_ratio,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },

  recommendedText: {
    alignSelf: 'flex-start',
    color: '#808080',
    marginVertical: 16 * height_ratio,
  },

  selectMotionView: {
    width: 150 * width_ratio,
    height: 32 * height_ratio,
    backgroundColor: '#242424',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginLeft: 10 * width_ratio,
    marginTop: 5 * height_ratio,
  },

  selectMotionText: {
    fontSize: 13,
    color: '#ffffff',
  },
});

export default styles;
