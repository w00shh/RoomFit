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
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 358 * width_ratio,
    justifyContent: 'space-between',
    marginTop: 40 * height_ratio,
  },
  logoutButton: {
    width: 88 * width_ratio,
    height: 42 * height_ratio,
    borderRadius: 8,
    borderWidth: 1 * height_ratio,
    borderColor: '#dfdfdf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: {
    marginLeft: 5 * width_ratio,
    marginTop: 2 * height_ratio,
  },
  subTitle: {
    marginTop: 32 * height_ratio,
    marginBottom: 16 * height_ratio,
    fontSize: 13 * height_ratio,
    fontWeight: '700',
    color: '#808080',
  },
  contentContainer: {
    width: 334 * width_ratio,
    marginVertical: 16 * height_ratio,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentContainer2: {
    width: 334 * width_ratio,
    marginTop: 16 * height_ratio,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentText: {
    fontSize: 16 * height_ratio,
    color: '#242424',
  },
  contentText2: {
    fontSize: 14 * height_ratio,
    color: '#242424',
  },
  subcontentText: {
    fontSize: 13 * height_ratio,
    color: '#808080',
    marginTop: 5 * height_ratio,
    marginBottom: 11 * height_ratio,
  },
  gigiContainer: {
    width: 358 * width_ratio,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingVertical: 16 * height_ratio,
    paddingHorizontal: 16 * width_ratio,
  },
  appContainer: {
    width: 358 * width_ratio,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingVertical: 16 * height_ratio,
    paddingHorizontal: 16 * width_ratio,
  },
  gitaContainer: {
    width: 358 * width_ratio,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingVertical: 16 * height_ratio,
    paddingHorizontal: 16 * width_ratio,
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
});

export default styles;
