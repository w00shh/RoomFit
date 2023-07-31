import React from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import styles from './styles';

import {serverAxios} from '../../utils/commonAxios';
import {AppContext} from '../../contexts/AppProvider';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';

import Back from '../../assets/svg/buttons/single/back.svg';
import Profile from '../../assets/svg/img/profile.svg';
import Icons from 'react-native-vector-icons/Ionicons';
import Icons_two from 'react-native-vector-icons/Entypo';
import Icons_three from 'react-native-vector-icons/Octicons';
import Setting from '../../assets/svg/buttons/default/setting.svg';

import CustomButton_B from '../../components/CustomButton_B';
import CustomButton_W from '../../components/CustomButton_W';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const category = [
  'Q&A',
  '헬스자랑',
  '자유게시판',
  '운동팁',
  '운동일지',
  '운동식단',
];

const CategoryBar = () => {
  return (
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.additionalSelectContainer}>
        <View style={styles.categoryContainer}>
          {category.map((item, key) => (
            <TouchableOpacity
              key={key}
              style={{
                paddingVertical: 8 * height_ratio,
                paddingHorizontal: 12 * width_ratio,
                backgroundColor: '#242424', //색깔 수정 필요
                borderRadius: 8 * height_ratio,
              }}
              onPress={() => {
                console.log('hi');
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#fff',
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const Comment = ({
  comment_content,
  user_name,
  created_at,
  comment_id,
  comment_count,
  onCommentCountChange,
  comment_user_id,
  props,
}) => {
  const [isSettingModal, setIsSettingModal] = React.useState(false);

  const deleteComment = async () => {
    console.log(comment_id);
    console.log(comment_count);
    await serverAxios
      .delete('/community/delete-comment?comment_id=' + comment_id.toString())
      .then(res => {
        if (res.data.success == '1') {
          console.log('success');
          comment_count = comment_count - 1;
          onCommentCountChange(comment_count);
          Alert.alert('댓글 삭제 완료');
        } else {
          console.log('fail');
        }
      });
  };
  return (
    <>
      <Modal visible={isSettingModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.postContainer}>
            <View style={styles.postTitle}>
              <Text style={styles.titleText}>댓글 메뉴</Text>
              <TouchableOpacity onPress={() => setIsSettingModal(false)}>
                <Icons_three name="x" size={28 * height_ratio} color="black" />
              </TouchableOpacity>
            </View>
            <View>
              {comment_user_id == props && (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      '댓글 삭제',
                      '댓글을 삭제하시겠습니까?',
                      [
                        {
                          text: '취소',
                          onPress: () => {
                            console.log('Cancel Pressed');
                            setIsSettingModal(false);
                          },
                          style: 'cancel',
                        },
                        {
                          text: '삭제',
                          onPress: () => {
                            deleteComment();
                            setIsSettingModal(false);
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }}>
                  <View style={styles.settingModalMenu}>
                    <Text style={styles.titleText}>삭제</Text>
                  </View>
                </TouchableOpacity>
              )}
              <TouchableOpacity>
                <View style={styles.settingModalMenu}>
                  <Text style={styles.titleText}>신고</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.commentContainer}>
        <View style={styles.commentLeftContainer}>
          <Profile
            width={24 * width_ratio}
            height={24 * height_ratio}
            style={{marginRight: 8 * width_ratio}}
          />
          <View>
            <Text>{user_name}</Text>
            <Text>{comment_content}</Text>
          </View>
        </View>

        <View style={styles.commentDots}>
          <TouchableOpacity
            onPress={() => {
              setIsSettingModal(true);
            }}>
            <Icons_two name="dots-three-vertical" size={12 * height_ratio} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const Feed = ({
  image_url,
  feed_content,
  user_name,
  like_count,
  comment_count,
  created_at,
  feed_id,
  user_id,
  is_like,
  props,
  fetchData,
}) => {
  const [pressComment, isPressedComment] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [show_like_count, set_show_like_count] = React.useState(like_count);
  const [show_comment_count, set_show_comment_count] =
    React.useState(comment_count);
  const [comment_data, setComment_data] = React.useState([]);
  const [input_comment_content, setinput_Comment_content] = React.useState('');
  React.useEffect(() => {
    if (is_like == 0) {
      setLiked(false);
    } else {
      setLiked(true);
    }
    console.log(is_like);
  }, []);

  React.useEffect(() => {
    set_show_like_count(like_count);
  }, [like_count]);

  React.useEffect(() => {
    set_show_comment_count(comment_count);
  }, [comment_count]);

  const handleCommentCountChange = new_comment_count => {
    set_show_comment_count(new_comment_count);
    pressCommentandGetComment();
  };

  const pressLiked = async () => {
    const body = {
      user_id: props,
      feed_id: feed_id,
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

  const pressCommentandGetComment = async () => {
    console.log('pressed comments');

    await serverAxios
      .get('/community/feed-comment?feed_id=' + feed_id)
      .then(res => {
        if (res.data.success == '1') {
          const data = res.data.comment_data;
          let current_comment_data = JSON.parse(JSON.stringify(data));
          console.log(current_comment_data);
          setComment_data(current_comment_data);
        } else {
          console.log('fail');
        }
      });
  };

  const pushComment = async () => {
    const body = {
      feed_id: feed_id,
      user_id: props,
      comment_content: input_comment_content,
    };

    await serverAxios.post('/community/post-comment', body).then(res => {
      if (res.data.success == '1') {
        console.log('success');
        handleCommentChange('');
        set_show_comment_count(show_comment_count + 1);
        pressCommentandGetComment();
      } else {
        console.log('fail');
      }
    });
  };

  const handleCommentChange = inputText => {
    setinput_Comment_content(inputText);
  };

  const [isSettingModal, setIsSettingModal] = React.useState(false);

  const deleteFeed = async () => {
    console.log('feed_id : ');
    console.log(feed_id);
    await serverAxios
      .delete('/community/delete-feed?feed_id=' + feed_id)
      .then(res => {
        if (res.data.success == '1') {
          console.log('success');
          fetchData();
          Alert.alert('게시물 삭제 완료');
        } else {
          console.log('fail');
        }
      });
  };

  return (
    <>
      <Modal visible={isSettingModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.postContainer}>
            <View style={styles.postTitle}>
              <Text style={styles.titleText}>피드 메뉴</Text>
              <TouchableOpacity onPress={() => setIsSettingModal(false)}>
                <Icons_three name="x" size={20 * height_ratio} color="black" />
              </TouchableOpacity>
            </View>
            <View>
              {props == user_id && (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      '게시물 삭제',
                      '게시물을 삭제하시겠습니까?',
                      [
                        {
                          text: '취소',
                          onPress: () => {
                            console.log('Cancel Pressed');
                            setIsSettingModal(false);
                          },
                          style: 'cancel',
                        },
                        {
                          text: '삭제',
                          onPress: () => {
                            deleteFeed();
                            setIsSettingModal(false);
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }}>
                  <View style={styles.settingModalMenu}>
                    <Text style={styles.titleText}>삭제</Text>
                  </View>
                </TouchableOpacity>
              )}
              <TouchableOpacity>
                <View style={styles.settingModalMenu}>
                  <Text style={styles.titleText}>신고</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.Feed}>
        <View style={styles.FeedBar}>
          <View style={styles.FeedProfile}>
            <Profile width={36 * width_ratio} height={36 * height_ratio} />
            <Text style={styles.UserName}>{user_name}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setIsSettingModal(true);
            }}>
            <Icons_two name="dots-three-vertical" size={18 * height_ratio} />
          </TouchableOpacity>
        </View>

        <View style={styles.FeedContent}>
          <Text style={styles.FeedContentText}>{feed_content}</Text>
        </View>
        {image_url != null && (
          <View>
            <Image
              source={{
                uri: image_url,
              }}
              style={styles.image}
            />
          </View>
        )}
        <View style={styles.FeedBottom}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.Likes}>
              <TouchableOpacity
                onPress={() => {
                  pressLiked();
                }}>
                {liked ? (
                  <Icons
                    name="heart"
                    size={24 * height_ratio}
                    color="#f02828"></Icons>
                ) : (
                  <Icons
                    name="heart-outline"
                    size={24 * height_ratio}
                    color="#242424"></Icons>
                )}
              </TouchableOpacity>
              {/* <Text>{show_like_count}</Text> */}
            </View>
            <View style={styles.Comments}>
              <TouchableOpacity
                onPress={() => {
                  isPressedComment(!pressComment);
                  if (!pressComment) {
                    pressCommentandGetComment();
                  }
                }}>
                <Icons
                  name="chatbubble-ellipses-outline"
                  size={24 * height_ratio}
                  color="#242424"></Icons>
              </TouchableOpacity>
              {/* <Text>{show_comment_count}</Text> */}
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            {show_like_count !== 0 && (
              <Text style={{color: '#242424', fontSize: 15}}>
                {show_like_count}
              </Text>
            )}
            {show_like_count !== 0 && (
              <Text style={{fontSize: 12}}> Likes </Text>
            )}
            {show_comment_count !== 0 && (
              <Text style={{color: '#242424', fontSize: 15}}>
                {show_comment_count}
              </Text>
            )}
            {show_comment_count !== 0 && (
              <Text style={{fontSize: 12}}> Comments </Text>
            )}
          </View>
        </View>
        {pressComment && (
          <View>
            {comment_data.map((item, key) => (
              <View>
                <Comment
                  key={item.comment_id}
                  comment_content={item.comment_content}
                  user_name={item.user_name}
                  created_at={item.created_at}
                  comment_id={item.comment_id}
                  comment_count={comment_count}
                  comment_user_id={item.user_id}
                  onCommentCountChange={handleCommentCountChange}
                  props={props}
                />
              </View>
            ))}
            <View style={styles.commentInputContainer}>
              <TextInput
                style={{fontSize: 14 * height_ratio}}
                onChangeText={handleCommentChange}
                value={input_comment_content}
                placeholder="댓글"
                inputMode="text"></TextInput>
              <TouchableOpacity
                onPress={() => {
                  pushComment();
                }}>
                <Icons_three
                  name="comment"
                  size={28 * height_ratio}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const Community = ({navigation}) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Back height={24 * height_ratio} width={24 * width_ratio} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <>
          <Text
            style={{
              marginHorizontal: Platform.OS === 'ios' ? 0 : 6 * width_ratio,
              color: '#242424',
              fontSize: 16 * height_ratio,
              fontWeight: '700',
            }}>
            룸핏 커뮤니티
          </Text>
        </>
      ),
    });
  }, []);
  const [isPostingModal, setIsPostingModal] = React.useState(false);
  const [postContent, setPostContent] = React.useState('');
  const handleInputChange = inputText => {
    setPostContent(inputText);
  };

  const [postimage_url, setpostimage_url] = React.useState(null);
  const PostImage = async () => {
    const image = {
      uri: '',
      type: '',
      name: '',
    };

    await launchImageLibrary({}, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.errorCode) {
        console.log('ImagePicker Error: ', res.errorCode);
      } else if (res.assets) {
        //정상적으로 사진을 반환 받았을 때
        console.log('ImagePicker res', res);
        image.name = res.assets[0].fileName;
        image.type = res.assets[0].type;
        image.uri =
          Platform.OS === 'android'
            ? res.assets[0].uri
            : res.assets[0].uri.replace('file://', '');
        setpostimage_url(image);
        // setpostimage_url(image.uri);
      }
    });
  };
  const appContext = React.useContext(AppContext);
  const user_id = appContext.state.userid;

  const fetchData = async () => {
    await serverAxios
      .get('/community/?user_id=' + user_id)
      .then(res => {
        if (res.data.success == '1') {
          const data = res.data.feed_data;
          let current_feed_data = JSON.parse(JSON.stringify(data));
          setFeed_data(current_feed_data.reverse());
        } else {
          console.log('fail');
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const postFeed = async () => {
    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('content', postContent);
    formData.append('image', postimage_url);
    formData.append('category', selectedCategory);

    await serverAxios
      .post('/community/post-feed', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log(res);
        Alert.alert('피드 등록 완료!');
        fetchData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [feed_data, setFeed_data] = React.useState([]);
  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    console.log('log test');
    console.log(feed_data);
  }, [feed_data]);

  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([
    {label: 'Q&A', value: 'Q&A'},
    {label: '헬스 자랑', value: '헬스 자랑'},
    {label: '자유게시판', value: '자유게시판'},
    {label: '운동 팁', value: '운동 팁'},
    {label: '운동 일지', value: '운동 일지'},
    {label: '운동 식단', value: '운동 식단'},
  ]);

  return (
    <View style={{flex: 1}}>
      <Modal visible={isPostingModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.postContainer}>
            <View style={styles.postTitle}>
              <Text style={styles.titleText}>글 쓰기</Text>
              <TouchableOpacity
                onPress={() => {
                  setIsPostingModal(false);
                  handleInputChange('');
                  setpostimage_url(null);
                }}>
                <Icons_three name="x" size={28 * height_ratio} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.dropdown}>
              <DropDownPicker
                open={open}
                value={selectedCategory}
                items={items}
                setOpen={setOpen}
                setValue={setSelectedCategory}
                setItems={setItems}
                placeholder="글의 카테고리를 선택하세요."
              />
              {/* {selectedCategory && <Text>선택된 값: {selectedCategory}</Text>} */}
            </View>

            <View style={styles.postContentContainer}>
              <TextInput
                style={styles.postContent}
                multiline={true}
                placeholder="내용을 입력하세요"
                onChangeText={handleInputChange}
                value={postContent}
              />
              <Image source={postimage_url} style={styles.postImage} />
            </View>

            <View style={styles.modalButtonContainer}>
              <View>
                <CustomButton_W
                  width={171 * width_ratio}
                  content="사진 첨부"
                  disabled={false}
                  onPress={() => {
                    PostImage();
                  }}></CustomButton_W>
              </View>
              <View>
                <CustomButton_B
                  width={171 * width_ratio}
                  content="포스트"
                  disabled={category == null || postContent == ''}
                  onPress={() => {
                    postFeed();
                    handleInputChange('');
                    setpostimage_url(null);
                    setIsPostingModal(false);
                  }}></CustomButton_B>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <CategoryBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        {feed_data.map((item, key) => (
          <Feed
            key={item.feed_id}
            feed_id={item.feed_id}
            image_url={item.image_url}
            feed_content={item.feed_content}
            user_name={item.user_name}
            like_count={item.like_count}
            comment_count={item.comment_count}
            created_at={item.created_at}
            user_id={item.user_id}
            is_like={item.is_like}
            props={user_id}
            fetchData={fetchData}
          />
        ))}
      </ScrollView>
      <View style={styles.postButton}>
        <TouchableOpacity
          onPress={() => {
            setIsPostingModal(true);
          }}>
          <Icons_two name="pencil" size={28 * height_ratio} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Community;
