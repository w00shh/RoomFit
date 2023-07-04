import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },

  intro: {
    marginTop: 20,
    marginLeft: '12%',
    marginRight: '12%',
  },

  mainLogo: {
    marginTop: 25,
    marginLeft: '20%',
    marginRight: '20%',
  },

  Apple_Button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#000000',

    width: 358,
    height: 56,

    borderRadius: 8,
    padding: 0,

    marginTop: 0,
  },

  Kakao_Button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fee500',

    width: 358,
    height: 56,

    borderRadius: 8,
    padding: 0,

    marginTop: 45,
  },
  Google_Button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#4285f4',

    width: 358,
    height: 56,

    borderRadius: 8,
    padding: 0,

    marginTop: 12,
  },

  Button_Text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },

  Button_Text2: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },

  selectionContainer: {
    marginTop: 45,
    flexDirection: 'row',

    flex: 1,
  },

  devider: {
    height: 20,
  },
});

export default styles;
