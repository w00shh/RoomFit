import {StyleSheet, Dimensions} from 'react-native';
const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16 * height_ratio,
    paddingHorizontal: 16 * width_ratio,
    backgroundColor: 'white',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'rgba(0,0,0,0.7)',
  },

  messageContainer: {
    width: 296 * width_ratio,
    height: 224 * height_ratio,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16 * height_ratio,
    borderRadius: 12,
    backgroundColor: 'white',
  },

  titleContainer: {
    marginBottom: 32 * height_ratio,
    alignSelf: 'flex-start',
  },
  titleText: {
    fontWeight: '700',
    fontSize: 20 * height_ratio,
  },

  customerServiceCenterContainer: {
    marginTop: 16 * height_ratio,
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  descriptionContainer: {
    position: 'absolute',
    bottom: 58 * height_ratio,
    alignItems: 'center',
    justifyContent: 'center',
  },

  descriptionText: {
    fontSize: 14 * height_ratio,
    color: '#808080',
    marginRight: 4 * width_ratio,
  },
  customerServiceCenterText: {
    fontSize: 14 * height_ratio,
    color: '#242424',
    marginLeft: 4 * width_ratio,
  },
});

export default styles;
