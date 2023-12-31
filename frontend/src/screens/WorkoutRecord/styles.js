import {StyleSheet, Dimensions} from 'react-native';

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
  navigator: {
    position: 'absolute',
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 100,
    width: 358 * width_ratio,
    height: 64 * height_ratio,
    bottom: 29 * height_ratio,
  },

  Calendar: {
    borderBottomWidth: 8,
    borderBottomColor: '#f5f5f5',
  },

  grayCircle: {
    width: 48 * width_ratio,
    height: 48 * width_ratio,

    backgroundColor: '#f5f5f5',
    borderRadius: 24,

    alignItems: 'center',
    justifyContent: 'center',
  },

  RgrayCircle: {
    width: 48 * width_ratio,
    height: 48 * width_ratio,

    backgroundColor: '#f5f5f5',
    borderRadius: 24,

    alignItems: 'center',
    justifyContent: 'center',
  },

  pauseMotionTitle: {
    fontSize: 16 * height_ratio,
    fontWeight: '700',
    color: '#242424',
  },

  statusText: {
    fontSize: 48 * height_ratio,
    fontWeight: '400',
    color: '#242424',
  },

  targetText: {
    fontSize: 16 * height_ratio,
    fontWeight: '400',
    color: '#808080',
    marginBottom: 10 * height_ratio,
  },

  statusText2: {
    fontSize: 16 * height_ratio,
    fontWeight: '700',
    color: '#242424',
  },

  yoyakText: {
    fontSize: 16 * height_ratio,
    fontWeight: '700',
    color: '#242424',
    alignSelf: 'flex-start',
  },

  pauseSubtitle: {
    fontSize: 12 * height_ratio,
    fontWeight: '400',
    color: '#808080',
  },

  pauseSubcontent: {
    fontSize: 16 * height_ratio,
    fontWeight: '700',
    color: '#242424',
  },

  targetText: {
    fontSize: 14 * height_ratio,
    color: '#808080',
  },
  percentText: {
    fontSize: 16 * height_ratio,
    color: '#242424',
    fontWeight: '700',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 10,
  },
  dropdownContainerStyle: {
    height: 40 * height_ratio,
    width: 200 * width_ratio,
  },
  dropdownStyle: {
    backgroundColor: '#fafafa',
    paddingHorizontal: 10 * width_ratio,
  },
  dropdownDropStyle: {
    backgroundColor: '#fafafa',
    paddingHorizontal: 10 * width_ratio,
  },
  dropdownItemStyle: {
    justifyContent: 'flex-start',
  },
  selectedItemContainer: {
    marginTop: 60 * height_ratio, // Dropdown이 겹치지 않도록 간격을 두어 선택된 항목이 가려지지 않도록 함
  },
  selectedItemText: {
    fontSize: 16 * height_ratio,
    fontWeight: 'bold',
  },
  dropdown: {
    width: 85 * width_ratio,
    backgroundColor: 'white',
    borderColor: '#242424',
    borderWidth: 1 * height_ratio,
    borderRadius: 8 * height_ratio,
    marginBottom: 10 * height_ratio,
    minHeight: 40 * height_ratio,
  },
});

export default styles;
