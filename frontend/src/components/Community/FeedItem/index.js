import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
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
  const [comment, pressComment] = React.useState(false);
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

  const [comment_data, setComment_data] = React.useState([]);

  const [postContent, setPostContent] = React.useState('');
  const handleInputChange = inputText => {
    setPostContent(inputText);
  };

  const PostComment = async () => {
    const body = {
      feed_id: feed_id,
      user_id: props,
      comment_content: postContent,
    };
    await serverAxios.post('/community/post-comment', body).then(res => {
      if (res.data.success == '1') {
        console.log('success');
        pressCommentButton();
      } else {
        console.log('fail');
      }
    });
  };

  const pressCommentButton = async chk => {
    if (chk == 'pressed comment button') {
      pressComment(!comment);
    }
    console.log('pressed comments');
    await serverAxios
      .get('/community/feed-comment?feed_id=' + feed_id)
      .then(res => {
        if (res.data.success == '1') {
          const data = res.data.comment_data;
          let current_comment_data = JSON.parse(JSON.stringify(data));
          setComment_data(current_comment_data);
        } else {
          console.log('fail');
        }
      });
  };

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

  const deleteFeed = async () => {
    console.log('feed_id : ');
    console.log(feed_id);
    await serverAxios
      .delete('/community/delete-feed?feed_id=' + feed_id)
      .then(res => {
        if (res.data.success == '1') {
          console.log('success');
        } else {
          console.log('fail');
        }
      });
  };

  const deleteComment = async comment_id => {
    await serverAxios
      .delete('/community/delete-comment?comment_id=' + comment_id.toString())
      .then(res => {
        if (res.data.success == '1') {
          console.log('success');
        } else {
          console.log('fail');
        }
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
        {user_id == props && (
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                '피드 삭제',
                '피드를 삭제하시겠습니까?',
                [
                  {
                    text: '취소',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: '삭제',
                    onPress: () => {
                      deleteFeed();
                    },
                  },
                ],
                {cancelable: false},
              );
            }}>
            <Icons
              name="trash-outline"
              size={20 * height_ratio}
              color="black"></Icons>
          </TouchableOpacity>
        )}
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
        <TouchableOpacity
          onPress={() => {
            pressCommentButton('pressed comment button');
          }}>
          <Icons
            name="chatbubble-ellipses-outline"
            size={20 * height_ratio}
            color="black"></Icons>
        </TouchableOpacity>
        {/* <Text>{comment_nums}</Text> */}
      </View>
      {comment && (
        <View>
          <View>
            {comment_data.map(item => (
              <View>
                <Text>{item.user_name}</Text>
                <View style={styles.commentContainer}>
                  <Text>{item.comment_content}</Text>
                  <Text>{item.updated_at}</Text>
                  {item.user_id == props && (
                    <TouchableOpacity
                      onPress={() => {
                        console.log('pressed comment delete');
                        Alert.alert(
                          '댓글 삭제',
                          '댓글을 삭제하시겠습니까?',
                          [
                            {
                              text: '취소',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {
                              text: '삭제',
                              onPress: () => {
                                deleteComment(item.comment_id);
                              },
                            },
                          ],
                          {cancelable: false},
                        );
                      }}>
                      <Icons
                        name="trash"
                        size={20 * height_ratio}
                        color="black"></Icons>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
          <View style={styles.comment_container}>
            {/* 댓글 창 팝업 */}
            <TextInput
              style={styles.comment_input}
              onChangeText={handleInputChange}
              value={postContent}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                PostComment();
                handleInputChange('');
                console.log('pressed post comment');
              }}>
              <Text style={styles.buttonText}>댓글 작성</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Text style={styles.feed_content}>{feed_content}</Text>
      <Text>{created_at}</Text>
    </View>
  );
};

export default FeedItem;
