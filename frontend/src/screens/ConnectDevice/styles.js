import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 16 * height_ratio,
    paddingHorizontal: 16 * width_ratio,
    backgroundColor: 'white',
  },

  connectExplain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16 * width_ratio,
  },

  devider: {
    marginTop: 12 * height_ratio,
    height: 2 * height_ratio,
  },

  deviceName: {
    color: '#242424',
    fontSize: 16,
    fontWeight: '400',
  },

  connectButton: {
    width: 63 * width_ratio,
    height: 36 * height_ratio,
    borderColor: '#dfdfdf',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  disconnectButton: {
    width: 95 * width_ratio,
    height: 36 * height_ratio,
    borderColor: '#dfdfdf',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  statusText: {
    color: '#808080',
    fontSize: 13,
    fontWeight: '400',
  },

  connectText: {
    color: '#242424',
    fontSize: 16,
    fontWeight: '400',
  },

  connectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 19 * height_ratio,
    marginHorizontal: 16 * width_ratio,
    marginBottom: 47 * height_ratio,
  },

  connect: {
    color: '#242424',
    fontSize: 16,
    fontWeight: '400',
  },

  battery: {
    fontSize: 12,
    fontWeight: '400',
    color: '#808080',
  },

  reloadIcon: {
    marginRight: 16 * width_ratio,
    marginTop: 5 * height_ratio,
    fontWeight: '900',
  },
});

export default styles;
