import {StyleSheet, PixelRatio, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const standard_w = 390;
const standard_h = 797;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 16 * (height / standard_h),
    paddingHorizontal: 16 * (width / standard_w),
    backgroundColor: 'white',
  },

  intro: {
    marginTop: 48 * (height / standard_h),
  },

  mainLogo: {
    marginTop: 24 * (height / standard_h),
  },

  Apple_Button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#000000',

    width: 358 * (width / standard_w),
    height: 56 * (height / standard_h),

    borderRadius: 8,
    padding: 0,

    marginTop: 59 * (height / standard_h),
  },

  Kakao_Button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fee500',

    width: 358 * (width / standard_w),
    height: 56 * (height / standard_h),

    borderRadius: 8,
    padding: 0,

    marginTop: 45 * (height / standard_h),
  },
  Google_Button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#4285f4',

    width: 358 * (width / standard_w),
    height: 56 * (height / standard_h),

    borderRadius: 8,
    padding: 0,

    marginTop: 12 * (height / standard_h),
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
    marginTop: 25 * (height / standard_h),
    flexDirection: 'row',

    flex: 1,
  },

  devider: {
    height: 20 * (height / standard_h),
  },
});

export default styles;
