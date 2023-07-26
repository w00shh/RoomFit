import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  Button,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import styles from './styles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {serverAxios} from '../../utils/commonAxios';
import {AppContext} from '../../contexts/AppProvider';

import FeedItem from '../../components/Community/FeedItem';

// 피드 화면
const FeedScreen = props => {
  const [isPostingModal, setIsPostingModal] = React.useState(false);
  const [postimage_url, setpostimage_url] = React.useState(null);

  const [postContent, setPostContent] = React.useState('');
  const handleInputChange = inputText => {
    setPostContent(inputText);
  };

  const PostFeed = async user_id => {
    // console.log(postContent);
    // console.log(postimage_url);

    console.log('user_id:');
    console.log(user_id);
    console.log('content:');
    console.log(postContent);

    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('content', postContent);
    formData.append('image', postimage_url);

    await serverAxios
      .post('/community/post-feed', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log(res);
        Alert.alert('피드 등록 완료!');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const PostImage = async () => {
    // console.log(appContext.state.userid);
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

  return (
    props.feeds && (
      <View style={styles.container}>
        <Modal visible={isPostingModal} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Button
                title="close"
                onPress={() => {
                  setIsPostingModal(false);
                }}
              />
              <TextInput
                onChangeText={handleInputChange}
                value={postContent}
                multiline={true}
                style={styles.input}
              />
              <Image source={postimage_url} style={styles.imageStyle} />
              <Button
                title="upload Photo"
                onPress={() => {
                  PostImage();
                }}
              />
              <Button
                title="post"
                onPress={() => {
                  PostFeed(props.props);
                }}
              />
            </View>
          </View>
        </Modal>
        <ScrollView feed_contentContainerStyle={styles.feedContainer}>
          {props.feeds.map(item => (
            <FeedItem
              key={item.feed_id}
              feed_id={item.feed_id}
              image_url={item.image_url}
              feed_content={item.feed_content}
              user_name={item.user_name}
              like_count={item.like_count}
              // comment_nums={item.comment_nums}
              created_at={item.created_at}
              user_id={item.user_id}
              is_like={item.is_like}
              props={props.props}
            />
          ))}
        </ScrollView>
        <Button title="post" onPress={() => setIsPostingModal(true)} />
      </View>
    )
  );
};

// 앱 컴포넌트
const Community = () => {
  const appContext = React.useContext(AppContext);
  const user_id = appContext.state.userid;
  // console.log(appContext.state.userid);

  const fetchData = async () => {
    await serverAxios
      .get('/community/?user_id=' + user_id)
      .then(res => {
        if (res.data.success == '1') {
          const data = res.data.feed_data;
          let current_feed_data = JSON.parse(JSON.stringify(data));
          setFeed_data(current_feed_data);
        } else {
          console.log('fail');
        }
      })
      .catch(e => {
        console.log(e);
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

  return <FeedScreen feeds={feed_data} props={user_id} />;
};

export default Community;
