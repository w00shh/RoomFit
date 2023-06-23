import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },

  connectExplain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },

  devider: {
    marginTop: 12,
    height: 2,
  },

  deviceName: {
    color: '#242424',
    fontSize: 16,
    fontWeight: '400',
  },

  connectButton: {
    width: 63,
    height: 36,
    borderColor: '#dfdfdf',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  disconnectButton: {
    width: 95,
    height: 36,
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
    marginTop: 19,
    marginHorizontal: 16,
    marginBottom: 47,
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
    marginRight: 16,
    marginTop: 5,
    fontWeight: '900',
  },
});

export default styles;
