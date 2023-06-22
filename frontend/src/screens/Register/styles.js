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
  titleContainer: {
    marginBottom: 32,
    alignSelf: 'flex-start',
  },
  titleText: {
    fontWeight: '700',
    fontSize: 20,
  },
  toLogin: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  questionText: {
    marginHorizontal: 4,
    fontSize: 14,
    color: '#808080',
  },
  loginText: {
    marginHorizontal: 4,
    fontSize: 14,
    color: '#242424',
  },
});

export default styles;