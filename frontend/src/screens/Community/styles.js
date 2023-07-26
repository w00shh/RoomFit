import {StyleSheet, Dimensions} from 'react-native';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const styles = StyleSheet.create({
  additionalSelectContainer: {
    paddingVertical: 16 * height_ratio,
    flexDirection: 'column',
    gap: 12 * height_ratio,
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 8 * width_ratio,
  },

  Feed: {
    paddingVertical: 8 * height_ratio,
    paddingHorizontal: 12 * width_ratio,
  },
  FeedBar: {
    borderTopWidth: 1, // Add a top border
    borderTopColor: 'lightgray', // Color of the top border
    paddingTop: 10 * height_ratio,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  FeedProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  UserName: {
    fontSize: 18 * height_ratio,
    fontWeight: 'bold',
    marginLeft: 8 * width_ratio,
  },
  FeedContent: {},
  FeedContentText: {
    fontSize: 14 * height_ratio,
  },
  FeedBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Likes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8 * width_ratio,
  },
  Comments: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginTop: 8 * height_ratio,
    width: 180 * width_ratio,
    height: 180 * height_ratio,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  postButton: {
    position: 'absolute',
    backgroundColor: '#5252fa',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 100,
    width: 64 * width_ratio,
    height: 64 * height_ratio   ,
    bottom: 29 * height_ratio,
    right: 29 * width_ratio,
  },
});
export default styles;
