import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  topProfile: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  bottomIcons: {
    flexDirection: 'row',
  },
  feedContainer: {
    padding: 20,
  },
  feedItem: {
    marginBottom: 20,
  },
  feedImage: {
    width: '100%',
    height: 300,
  },
  caption: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
