import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  feedItem: {
    marginBottom: 20,
  },
  topProfile: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  feedImage: {
    width: '100%',
    height: 300,
  },
  bottomIcons: {
    flexDirection: 'row',
  },
  comment_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },

  comment_input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
  button: {
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentContainer:{
    flexDirection:'row',
    alignItems:'center',

  }
});

export default styles;
