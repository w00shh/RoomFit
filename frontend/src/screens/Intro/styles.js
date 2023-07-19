import {StyleSheet, Dimensions, Platform} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

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
    aspectRatio: (320 * width_ratio) / (352 * height_ratio),
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: 358 * width_ratio,
    height: 56 * height_ratio,
    shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 2, // Android에서 그림자를 표현하기 위해 필요한 속성
    borderRadius: 8,
    padding: 0,
    paddingHorizontal: 8 * width_ratio,
    marginTop: 12 * height_ratio,
    borderWidth: 0.5 * height_ratio,
    borderColor: '#4285f4',
  },

  Button_Text: {
    color: '#242424',
    fontSize: 16 * height_ratio,
    fontWeight: '500',
    flex: 1.3,
  },

  Button_Text2: {
    color: 'black',
    fontSize: 16 * height_ratio,
    fontWeight: '500',
  },

  selectionContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 64 * height_ratio : 32 * height_ratio,
  },

  devider: {
    height: 20 * height_ratio,
  },
});

export default styles;
