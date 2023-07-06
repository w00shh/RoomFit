import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('window').width / 390;
const height_ratio = Dimensions.get('window').height / 844;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 16 * height_ratio,
    paddingHorizontal: 16 * width_ratio,
    backgroundColor: 'white',
  },

  intro: {
    marginTop: 48 * height_ratio,
  },

  mainLogo: {
    marginTop: 24 * height_ratio,
  },

  Apple_Button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#000000',

    width: 358 * width_ratio,
    height: 56 * height_ratio,

    borderRadius: 8,
    padding: 0,

    marginTop: 59 * height_ratio,
  },

  Kakao_Button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fee500',

    width: 358 * width_ratio,
    height: 56 * height_ratio,

    borderRadius: 8,
    padding: 0,

    marginTop: 45 * height_ratio,
  },
  Google_Button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#4285f4',

    width: 358 * width_ratio,
    height: 56 * height_ratio,

    borderRadius: 8,
    padding: 0,

    marginTop: 12 * height_ratio,
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
    marginTop: 25 * height_ratio,
    flexDirection: 'row',

    flex: 1,
  },

  devider: {
    height: 20 * height_ratio,
  },
});

export default styles;
