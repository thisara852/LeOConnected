// components/LeoFeedPost.js
import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import CustomAppIcon from './CustomAppIcon';
import { styles } from '../styles';

const LeoFeedPost = ({ name, time, imageSource, views, likes, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.feedPost}>
    <View style={styles.postHeader}>
      <Image source={require('../assets/Leo-District-Logo-306-D2.png')} style={styles.postAvatar} />
      <View style={styles.postUserInfo}>
        <Text style={styles.postUsername}>{name}</Text>
        <Text style={styles.postTime}>{time}</Text>
      </View>
      <TouchableOpacity style={styles.bookmarkIcon}>
        <CustomAppIcon name="bookmark" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    </View>

    <Text style={styles.postTextGold}>
      LMP 2025 LMD 306 Rangers Is LIVE! Start Your Leadership Mentoring Journey Now.
    </Text>

    <Image source={imageSource} style={styles.feedPostImage} resizeMode="cover" />

    <View style={styles.postFooter}>
      <View style={styles.reactionIcons}>
        <CustomAppIcon name="heart" size={20} />
        <View style={{ width: 12 }} />
        <CustomAppIcon name="message" size={20} />
        <View style={{ width: 12 }} />
        <CustomAppIcon name="send" size={20} />
      </View>
      <Text style={styles.likeText}>Liked by mr.beast and {likes} others</Text>
      <Text style={styles.viewCount}>K {views} Views</Text>
    </View>
  </TouchableOpacity>
);

export default LeoFeedPost;
