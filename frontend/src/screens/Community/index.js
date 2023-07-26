import React from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './styles';

import {serverAxios} from '../../utils/commonAxios';
import {AppContext} from '../../contexts/AppProvider';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Profile from '../../assets/svg/img/profile.svg';
import Icons from 'react-native-vector-icons/Ionicons';
import Icons_two from 'react-native-vector-icons/Entypo';
import Setting from '../../assets/svg/buttons/default/setting.svg';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

const CategoryBar = () => {
  const category = [
    'Q&A',
    '헬스자랑',
    '자유게시판',
    '운동팁',
    '운동일지',
    '운동식단',
  ];
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
                backgroundColor: '#5252fa', //색깔 수정 필요
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

const Feed = ({
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
  return (
    <View style={styles.Feed}>
      <View style={styles.FeedBar}>
        <View style={styles.FeedProfile}>
          <Profile width={40 * width_ratio} height={40 * height_ratio} />
          <Text style={styles.UserName}>{user_name}</Text>
        </View>
        <Icons_two name="dots-three-vertical" size={28 * height_ratio} />
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
        <View style={styles.Likes}>
          {true ? (
            <Icons
              name="heart"
              size={28 * height_ratio}
              color="#5252fa"></Icons>
          ) : (
            <Icons
              name="heart-outline"
              size={28 * height_ratio}
              color="#5252fa"></Icons>
          )}
          <Text>{like_count}</Text>
        </View>
        <View style={styles.Comments}>
          <Icons
            name="chatbubble-ellipses-outline"
            size={28 * height_ratio}
            color="#5252fa"></Icons>
          <Text>0</Text>
        </View>
      </View>
    </View>
  );
};

const Community = () => {
  const [isPostingModal, setIsPostingModal] = React.useState(false);
  const appContext = React.useContext(AppContext);
  const user_id = appContext.state.userid;

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

  return (
    <View style={{flex: 1}}>
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
            // comment_nums={item.comment_nums}
            created_at={item.created_at}
            user_id={item.user_id}
            is_like={item.is_like}
            props={user_id}
          />
        ))}
      </ScrollView>
      <View style={styles.postButton}>
        <TouchableOpacity
          onPress={() => {
            console.log('hi');
          }}>
          <Icons_two name="pencil" size={28 * height_ratio} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Community;
