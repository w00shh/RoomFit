import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {serverAxios} from '../../utils/commonAxios';

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

// 하드코딩된 피드 데이터
// const feeds = [
//   {
//     feed_id: '1',
//     user_name: 'user1',
//     imageUrl:
//       'https://mblogthumb-phinf.pstatic.net/MjAyMTAxMTNfMjQy/MDAxNjEwNTMxNzU0NDAw.dnT66RTVTyv0DURLa16orDdxHfYGkWw2fIf-VvkWZl0g.DLOrmXxdYsTEU_PaIgDXLBgvs9W4lWrvcA78aObeo0Mg.JPEG.sb02199/3.jpg?type=w800',
//     feed_content: '살려줘',
//     like_count: 10,
//     comment_nums: 10,
//     created_at: '2022-08-21',
//   },
//   {
//     feed_id: '2',
//     user_name: 'user1',
//     imageUrl:
//       'https://mblogthumb-phinf.pstatic.net/MjAyMTAxMTNfMjQy/MDAxNjEwNTMxNzU0NDAw.dnT66RTVTyv0DURLa16orDdxHfYGkWw2fIf-VvkWZl0g.DLOrmXxdYsTEU_PaIgDXLBgvs9W4lWrvcA78aObeo0Mg.JPEG.sb02199/3.jpg?type=w800',
//     feed_content: '살려줘',
//     like_count: 10,
//     comment_nums: 10,
//     created_at: '2022-08-21',
//   },
//   {
//     feed_id: '3',
//     user_name: 'user1',
//     imageUrl:
//       'https://mblogthumb-phinf.pstatic.net/MjAyMTAxMTNfMjQy/MDAxNjEwNTMxNzU0NDAw.dnT66RTVTyv0DURLa16orDdxHfYGkWw2fIf-VvkWZl0g.DLOrmXxdYsTEU_PaIgDXLBgvs9W4lWrvcA78aObeo0Mg.JPEG.sb02199/3.jpg?type=w800',
//     feed_content: '살려줘',
//     like_count: 10,
//     comment_nums: 10,
//     created_at: '2022-08-21',
//   },
//   {
//     feed_id: '4',
//     user_name: 'user1',
//     imageUrl:
//       'https://mblogthumb-phinf.pstatic.net/MjAyMTAxMTNfMjQy/MDAxNjEwNTMxNzU0NDAw.dnT66RTVTyv0DURLa16orDdxHfYGkWw2fIf-VvkWZl0g.DLOrmXxdYsTEU_PaIgDXLBgvs9W4lWrvcA78aObeo0Mg.JPEG.sb02199/3.jpg?type=w800',
//     feed_content: '살려줘',
//     like_count: 10,
//     comment_nums: 10,
//     created_at: '2022-08-21',
//   },
//   {
//     feed_id: '5',
//     user_name: 'user1',
//     imageUrl:
//       'https://mblogthumb-phinf.pstatic.net/MjAyMTAxMTNfMjQy/MDAxNjEwNTMxNzU0NDAw.dnT66RTVTyv0DURLa16orDdxHfYGkWw2fIf-VvkWZl0g.DLOrmXxdYsTEU_PaIgDXLBgvs9W4lWrvcA78aObeo0Mg.JPEG.sb02199/3.jpg?type=w800',
//     feed_content: '살려줘',
//     like_count: 10,
//     comment_nums: 10,
//     created_at: '2022-08-21',
//   },
//   {
//     feed_id: '6',
//     user_name: 'user1',
//     imageUrl:
//       'https://mblogthumb-phinf.pstatic.net/MjAyMTAxMTNfMjQy/MDAxNjEwNTMxNzU0NDAw.dnT66RTVTyv0DURLa16orDdxHfYGkWw2fIf-VvkWZl0g.DLOrmXxdYsTEU_PaIgDXLBgvs9W4lWrvcA78aObeo0Mg.JPEG.sb02199/3.jpg?type=w800',
//     feed_content: '살려줘',
//     like_count: 10,
//     comment_nums: 10,
//     created_at: '2022-08-21',
//   },
// ];
// 피드 항목 컴포넌트
const FeedItem = ({
  imageUrl,
  feed_content,
  user_name,
  like_count,
  // comment_nums,
  created_at,
}) => (
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
    <Image source={{uri: imageUrl}} style={styles.feedImage} />
    <View style={styles.bottomIcons}>
      <TouchableOpacity onPress={() => console.log('pressed like')}>
        <Icons
          name="heart-outline"
          size={20 * height_ratio}
          color="black"></Icons>
      </TouchableOpacity>
      <Text>{like_count}</Text>
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

// 피드 화면
const FeedScreen = props => {
  React.useEffect(() => {
    console.log('test');
    console.log(props.feeds);
  }, []);
  return (
    props.feeds && (
      <View style={styles.container}>
        <ScrollView feed_contentContainerStyle={styles.feedContainer}>
          {props.feeds.map(item => (
            <FeedItem
              key={item.feed_id}
              imageUrl={item.imageUrl}
              feed_content={item.feed_content}
              user_name={item.user_name}
              like_count={item.like_count}
              // comment_nums={item.comment_nums}
              created_at={item.created_at}
            />
          ))}
        </ScrollView>
      </View>
    )
  );
};

// 앱 컴포넌트
const Community = () => {
  const fetchData = async () => {
    await serverAxios
      .get('/community/')
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

  return feed_data.length > 0 && <FeedScreen feeds={feed_data} />;
};

export default Community;
