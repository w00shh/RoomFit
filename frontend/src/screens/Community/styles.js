import {StyleSheet, Dimensions} from 'react-native';

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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: Dimensions.get('window').width * 0.8,
    maxHeight: Dimensions.get('window').height * 0.8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#cecece',
    marginTop: 20,
  },
});

export default styles;
