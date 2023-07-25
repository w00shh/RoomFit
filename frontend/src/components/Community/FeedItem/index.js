import React from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

import {serverAxios} from '../../../utils/commonAxios';

const height_ratio = Dimensions.get('screen').height / 844;

// 피드 항목 컴포넌트
const FeedItem = ({
  image_url,
  feed_content,
  user_name,
  like_count,
  // comment_nums,
  created_at,
  feed_id,
  user_id,
  is_like,
  props,
}) => {
  const [liked, setLiked] = React.useState(false);
  React.useEffect(() => {
    if (is_like == 0) {
      setLiked(false);
    } else {
      setLiked(true);
    }
    console.log(is_like);
  }, []);
  const [show_like_count, set_show_like_count] = React.useState(like_count);
  React.useEffect(() => {
    set_show_like_count(like_count);
  }, [like_count]);

  const pressLiked = async (feed_id, user_id) => {
    const body = {
      feed_id: feed_id,
      user_id: props,
    };
    await serverAxios
      .put('/community/like-feed', body)
      .then(res => {
        if (res.data.success == '1') {
          console.log('success');
          console.log(res.data.unliked);
          if (!res.data.unliked) {
            setLiked(true);
            set_show_like_count(show_like_count + 1);
          } else {
            setLiked(false);
            set_show_like_count(show_like_count - 1);
          }
        } else {
          console.log('fail');
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <View style={styles.feedItem}>
      <View style={styles.topProfile}>
        <Icons
          name="person-circle-outline"
          size={20 * height_ratio}
          color="black"></Icons>
        <Text style={styles.user_name}>{user_name}</Text>
        <TouchableOpacity onPress={() => console.log('pressed more')}>
          <Icons
            name="ellipsis-vertical-outline"
            size={20 * height_ratio}
            color="black"></Icons>
        </TouchableOpacity>
      </View>
      <Image source={{uri: image_url}} style={styles.feedImage} />
      <View style={styles.bottomIcons}>
        <TouchableOpacity
          onPress={() => {
            pressLiked(feed_id, user_id);
          }}>
          {liked ? (
            <Icons name="heart" size={20 * height_ratio} color="black"></Icons>
          ) : (
            <Icons
              name="heart-outline"
              size={20 * height_ratio}
              color="black"></Icons>
          )}
        </TouchableOpacity>
        <Text>{show_like_count}</Text>
        <TouchableOpacity onPress={() => console.log('pressed comments')}>
          <Icons
            name="chatbubble-ellipses-outline"
            size={20 * height_ratio}
            color="black"></Icons>
        </TouchableOpacity>
        {/* <Text>{comment_nums}</Text> */}
      </View>
      <Text style={styles.feed_content}>{feed_content}</Text>
      <Text>{created_at}</Text>
    </View>
  );
};

export default FeedItem;
