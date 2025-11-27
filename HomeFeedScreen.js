// HomeFeedScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar as RNStatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// Colors
const PRIMARY_GOLD = '#FFC107';
const BG_DARK = '#000000';
const TEXT_LIGHT = '#F3F4F6';
const INACTIVE_TAB_COLOR = '#9CA3AF';
const SECONDARY_DARK = '#1F1F1F';

// Custom App Icon
const CustomAppIcon = ({ name, size = 20, color = TEXT_LIGHT, style }) => (
  <Icon name={name} size={size} color={color} style={style} />
);

// Story Components
const StoryCircle = ({ label, uri, isNew = false, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ alignItems: 'center', marginRight: 15 }}>
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: isNew ? 2 : 0,
        borderColor: PRIMARY_GOLD
      }}
    >
      <Image source={uri} style={{ width: 50, height: 50, borderRadius: 25 }} />
    </View>
    <Text style={{ color: TEXT_LIGHT, marginTop: 5 }}>{label}</Text>
  </TouchableOpacity>
);

// Stories Bar
const StoriesBar = ({ openStory }) => {
  const stories = [
    { label: 'Leo D2', uri: require('../assets/Leo-District-Logo-306-D11.png'), isNew: true, image: 'https://placekitten.com/800/1400' },
    { label: 'Leo D3', uri: require('../assets/Leo-District-Logo-306-D2.png'), image: 'https://placekitten.com/801/1400' },
    { label: 'Leo Club 1', uri: require('../assets/Leo-District-Logo-306-D2.png'), image: 'https://placekitten.com/802/1400' },
    { label: 'Leo Club 2', uri: require('../assets/Leo-District-Logo-306-D11.png'), image: 'https://placekitten.com/803/1400' },
    { label: 'Leo Club 3', uri: require('../assets/Leo-District-Logo-306-D2.png'), image: 'https://placekitten.com/804/1400' },
    { label: 'Leo Club 4', uri: require('../assets/Leo-District-Logo-306-D11.png'), image: 'https://placekitten.com/805/1400' },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginVertical: 10, paddingHorizontal: 15 }}
    >
      {stories.map((story, index) => (
        <StoryCircle
          key={index}
          {...story}
          onPress={() => openStory(story.image)}
        />
      ))}
    </ScrollView>
  );
};

// Tab Segment
const TabSegment = ({ activeTab, setActiveTab }) => {
  const tabs = ['All Post', 'Following', 'Event'];
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginVertical: 10 }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <Text style={{ color: isActive ? PRIMARY_GOLD : INACTIVE_TAB_COLOR, fontWeight: isActive ? 'bold' : 'normal' }}>
              {tab}
            </Text>
            {isActive && <View style={{ height: 2, backgroundColor: PRIMARY_GOLD, marginTop: 3 }} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Feed Post Component
const LeoFeedPost = ({ name, time, views, likes, image, onPress }) => {
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.feedPost}>
      <View style={styles.postHeader}>
        <Image source={require('../assets/Leo-District-Logo-306-D2.png')} style={styles.postAvatar} />
        <View style={styles.postUserInfo}>
          <Text style={styles.postUsername}>{name}</Text>
          <Text style={styles.postTime}>{time}</Text>
        </View>
        <TouchableOpacity style={styles.bookmarkIcon} onPress={toggleBookmark}>
          <CustomAppIcon
            name={bookmarked ? "bookmark" : "bookmark-outline"}
            size={20}
            color={bookmarked ? PRIMARY_GOLD : "#9CA3AF"}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.postTextGold}>
        LMP 2025 LMD 306 Rangers Is LIVE! Start Your Leadership Mentoring Journey Now.
      </Text>

      <Image source={image} style={styles.feedPostImage} />

      <View style={styles.postFooter}>
        <View style={styles.reactionIcons}>
          <CustomAppIcon name="heart-outline" size={20} color={TEXT_LIGHT} style={{ marginRight: 15 }} />
          <CustomAppIcon name="chatbubble-outline" size={20} color={TEXT_LIGHT} style={{ marginRight: 15 }} />
          <CustomAppIcon name="paper-plane-outline" size={20} color={TEXT_LIGHT} style={{ marginRight: 15 }} />
          <CustomAppIcon name="link-outline" size={20} color={TEXT_LIGHT} style={{ marginRight: 15 }} />
        </View>
        <Text style={styles.likeText}>Liked by mr.beast and {likes} others</Text>
        <Text style={styles.viewCount}>{views}K Views</Text>
      </View>
    </TouchableOpacity>
  );
};

// Bottom Navigation
const BottomNav = ({ currentScreen, setScreen }) => (
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: SECONDARY_DARK,
  }}>
    {['HomeFeed', 'Search', 'Notification', 'Setting', 'Profile'].map(screen => {
      let iconName;
      if (screen === 'HomeFeed') iconName = 'home-outline';
      if (screen === 'Search') iconName = 'search-outline';
      if (screen === 'Notification') iconName = 'notifications-outline';
      if (screen === 'Setting') iconName = 'settings-outline';
      if (screen === 'Profile') iconName = 'person-outline';

      return (
        <TouchableOpacity
          key={screen}
          onPress={() => {
            if (screen === 'Profile') setScreen('EditProfile');
            else if (screen === 'Setting') setScreen('Profile');
            else setScreen(screen);
          }}
          style={{ alignItems: 'center' }}
        >
          <CustomAppIcon
            name={iconName}
            size={28}
            color={currentScreen === screen ? PRIMARY_GOLD : INACTIVE_TAB_COLOR}
          />
        </TouchableOpacity>
      );
    })}
  </View>
);

// Home Feed Screen
const HomeFeedScreen = ({ setScreen, openStory }) => {
  const [activeTab, setActiveTab] = useState('Following');
  const [currentBottomScreen, setCurrentBottomScreen] = useState('HomeFeed');

  const handlePostClick = () => {
    setScreen('PostDetail');
  };

  // Updated posts with different images
  const posts = [
    { name: "Leo District 306 D1", time: "08:39 am", views: "56", likes: "34", image: require('../assets/post1.jpg') },
    { name: "Another Post", time: "09:00 am", views: "10", likes: "5", image: require('../assets/post2.jpg') },
    { name: "Leo Club Event", time: "10:15 am", views: "120", likes: "80", image: require('../assets/post3.jpg') },
    { name: "Leadership Workshop", time: "11:30 am", views: "200", likes: "150", image: require('../assets/post4.jpg') },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_DARK }}>
      <RNStatusBar barStyle="light-content" backgroundColor={BG_DARK} />

      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 }}>
        <View>
          <Text style={{ color: TEXT_LIGHT, fontSize: 18 }}>Welcome Back!</Text>
          <Text style={{ color: TEXT_LIGHT, fontSize: 22, fontWeight: 'bold' }}>Akarsha</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setScreen('Search')} style={{ marginRight: 15 }}>
            <CustomAppIcon name="search-outline" size={24} color={PRIMARY_GOLD} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setScreen('Notification')} style={{ marginRight: 15 }}>
            <CustomAppIcon name="notifications-outline" size={24} color={PRIMARY_GOLD} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Feed */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 80 }}>
        <StoriesBar openStory={openStory} />
        <TabSegment activeTab={activeTab} setActiveTab={setActiveTab} />

        {posts.map((post, index) => (
          <LeoFeedPost
            key={index}
            name={post.name}
            time={post.time}
            views={post.views}
            likes={post.likes}
            image={post.image}
            onPress={handlePostClick}
          />
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav
        currentScreen={currentBottomScreen}
        setScreen={(screenName) => {
          setCurrentBottomScreen(screenName);
          setScreen(screenName);
        }}
      />
    </SafeAreaView>
  );
};

// Styles
const styles = {
  feedPost: { marginBottom: 20, backgroundColor: SECONDARY_DARK, borderRadius: 10, overflow: 'hidden', paddingBottom: 15, marginHorizontal: 15 },
  postHeader: { flexDirection: 'row', alignItems: 'center', padding: 15, paddingBottom: 10 },
  postAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10, backgroundColor: '#3B82F6' },
  postUserInfo: { flex: 1, justifyContent: 'center' },
  postUsername: { fontSize: 15, fontWeight: 'bold', color: TEXT_LIGHT },
  postTime: { fontSize: 12, color: INACTIVE_TAB_COLOR },
  bookmarkIcon: { padding: 5 },
  postTextGold: { fontSize: 15, color: PRIMARY_GOLD, paddingHorizontal: 15, marginBottom: 10, fontWeight: '600' },
  feedPostImage: { width: '100%', height: width * 0.8, backgroundColor: SECONDARY_DARK },
  postFooter: { paddingHorizontal: 15, marginTop: 10 },
  reactionIcons: { flexDirection: 'row', marginVertical: 5 },
  likeText: { fontSize: 13, color: TEXT_LIGHT, fontWeight: '500', marginTop: 5 },
  viewCount: { fontSize: 13, color: INACTIVE_TAB_COLOR, marginTop: 2 },
};

export default HomeFeedScreen;
