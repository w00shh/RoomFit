import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  searchContainer: {
    width: 358,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },

  recommendedText: {
    alignSelf: 'flex-start',

    color: '#808080',
    marginVertical: 16,
  },

  selectMotionView: {
    width: 150,
    height: 32,
    backgroundColor: '#242424',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginLeft: 10,
    marginTop: 5,
  },

  selectMotionText: {
    fontSize: 13,
    color: '#ffffff',
  },
});

export default styles;
