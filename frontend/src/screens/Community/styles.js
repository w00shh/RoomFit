import {StyleSheet, Dimensions, Platform} from 'react-native';

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
    paddingVertical: 8 * height_ratio,
    paddingHorizontal: 16 * width_ratio,
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
    fontSize: 16 * height_ratio,
    fontWeight: '700',
    color: '#242424',
    marginLeft: 8 * width_ratio,
  },
  FeedContent: {marginVertical: 16 * height_ratio},
  FeedContentText: {
    color: '#242424',
    fontSize: 16 * height_ratio,
  },
  FeedBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    height: 64 * height_ratio,
    bottom: 29 * height_ratio,
    right: 29 * width_ratio,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'white',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 0,
  },
  postContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'stretch',
    borderTopLeftRadius: 24 * height_ratio,
    borderTopRightRadius: 24 * height_ratio,
    paddingBottom: Platform.OS === 'ios' ? 16 * height_ratio : 0,
    flex: 1,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 16 * height_ratio,
    backgroundColor: '#ffffff',
  },
  postTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 32 * height_ratio,
    alignItems: 'center',
    paddingVertical: 24 * height_ratio,
  },
  titleText: {
    fontSize: 16 * height_ratio,
    fontWeight: '700',
    color: '#242424',
  },
  postContentContainer: {
    height: 200 * height_ratio, // 수정 필요
  },
  postContent: {
    height: 100 * height_ratio,
    paddingVertical: 8 * height_ratio,
    paddingHorizontal: 12 * width_ratio,
    textAlign: 'center',
  },
  postImage: {
    width: 100 * width_ratio,
    height: 100 * height_ratio,
    borderRadius: 10,
    marginLeft: 16 * width_ratio,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2 * height_ratio,
  },
  commentInputContainer: {
    marginTop: 8 * height_ratio,
    width: 358 * width_ratio,
    height: 56 * height_ratio,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16 * width_ratio,
    borderRadius: 8 * height_ratio,
    gap: 12 * width_ratio,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  settingModalMenu: {
    borderTopWidth: 0.5, // Add a top border
    borderTopColor: 'lightgray', // Color of the top border
    paddingVertical: 16 * height_ratio,
    marginHorizontal: 8 * width_ratio,
  },
  titleText: {
    fontSize: 16 * height_ratio,
    fontWeight: '700',
    color: '#242424',
    textAlign: 'center',
  },
  commentLeftContainer: {
    flexDirection: 'row',
    paddingVertical: 8 * height_ratio,
  },
  dropdown: {
    zIndex: 1,
    paddingVertical: 8 * height_ratio,
    paddingHorizontal: 12 * width_ratio,
  },
});
export default styles;
