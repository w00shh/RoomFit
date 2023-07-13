import React from 'react';
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

const width_ratio = Dimensions.get('screen').width / 390;
const height_ratio = Dimensions.get('screen').height / 844;

// 하드코딩된 피드 데이터
const feeds = [
  {
    id: '1',
    user_name: 'user1',
    imageUrl:
      'https://mblogthumb-phinf.pstatic.net/MjAyMTAxMTNfMjQy/MDAxNjEwNTMxNzU0NDAw.dnT66RTVTyv0DURLa16orDdxHfYGkWw2fIf-VvkWZl0g.DLOrmXxdYsTEU_PaIgDXLBgvs9W4lWrvcA78aObeo0Mg.JPEG.sb02199/3.jpg?type=w800',
    content: '살려줘',
    like_nums: 10,
    comment_nums: 10,
    date: '2022-08-21',
  },
  {
    id: '2',
    user_name: 'user1',
    imageUrl:
      'https://mblogthumb-phinf.pstatic.net/MjAyMTAxMTNfMjQy/MDAxNjEwNTMxNzU0NDAw.dnT66RTVTyv0DURLa16orDdxHfYGkWw2fIf-VvkWZl0g.DLOrmXxdYsTEU_PaIgDXLBgvs9W4lWrvcA78aObeo0Mg.JPEG.sb02199/3.jpg?type=w800',
    content: '살려줘',
    like_nums: 10,
    comment_nums: 10,
    date: '2022-08-21',
  },
  {
    id: '3',
    user_name: 'user1',
    imageUrl:
      'https://mblogthumb-phinf.pstatic.net/MjAyMTAxMTNfMjQy/MDAxNjEwNTMxNzU0NDAw.dnT66RTVTyv0DURLa16orDdxHfYGkWw2fIf-VvkWZl0g.DLOrmXxdYsTEU_PaIgDXLBgvs9W4lWrvcA78aObeo0Mg.JPEG.sb02199/3.jpg?type=w800',
    content: '살려줘',
    like_nums: 10,
    comment_nums: 10,
    date: '2022-08-21',
  },
  {
    id: '4',
    user_name: 'user1',
    imageUrl:
      'https://mblogthumb-phinf.pstatic.net/MjAyMTAxMTNfMjQy/MDAxNjEwNTMxNzU0NDAw.dnT66RTVTyv0DURLa16orDdxHfYGkWw2fIf-VvkWZl0g.DLOrmXxdYsTEU_PaIgDXLBgvs9W4lWrvcA78aObeo0Mg.JPEG.sb02199/3.jpg?type=w800',
    content: '살려줘',
    like_nums: 10,
    comment_nums: 10,
    date: '2022-08-21',
  },
  {
    id: '5',
    user_name: 'user1',
    imageUrl:
      'https://mblogthumb-phinf.pstatic.net/MjAyMTAxMTNfMjQy/MDAxNjEwNTMxNzU0NDAw.dnT66RTVTyv0DURLa16orDdxHfYGkWw2fIf-VvkWZl0g.DLOrmXxdYsTEU_PaIgDXLBgvs9W4lWrvcA78aObeo0Mg.JPEG.sb02199/3.jpg?type=w800',
    content: '살려줘',
    like_nums: 10,
    comment_nums: 10,
    date: '2022-08-21',
  },
  {
    id: '6',
    user_name: 'user1',
    imageUrl:
      'https://mblogthumb-phinf.pstatic.net/MjAyMTAxMTNfMjQy/MDAxNjEwNTMxNzU0NDAw.dnT66RTVTyv0DURLa16orDdxHfYGkWw2fIf-VvkWZl0g.DLOrmXxdYsTEU_PaIgDXLBgvs9W4lWrvcA78aObeo0Mg.JPEG.sb02199/3.jpg?type=w800',
    content: '살려줘',
    like_nums: 10,
    comment_nums: 10,
    date: '2022-08-21',
  },
];
// 피드 항목 컴포넌트
const FeedItem = ({
  imageUrl,
  content,
  user_name,
  like_nums,
  comment_nums,
  date,
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
      <Text>{comment_nums}</Text>
      <TouchableOpacity onPress={() => console.log('pressed comments')}>
        <Icons
          name="chatbubble-ellipses-outline"
          size={20 * height_ratio}
          color="black"></Icons>
      </TouchableOpacity>
      <Text>{like_nums}</Text>
    </View>
    <Text style={styles.content}>{content}</Text>
    <Text>{date}</Text>
  </View>
);

// 피드 화면
const FeedScreen = () => (
  <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.feedContainer}>
      {feeds.map(item => (
        <FeedItem
          key={item.id}
          imageUrl={item.imageUrl}
          content={item.content}
          user_name={item.user_name}
          like_nums={item.like_nums}
          comment_nums={item.comment_nums}
          date={item.date}
        />
      ))}
    </ScrollView>
  </View>
);

// 앱 컴포넌트
const Community = () => <FeedScreen />;

export default Community;
