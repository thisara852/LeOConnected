// components/StoriesBar.js
import React from 'react';
import { ScrollView, View, Image, Text } from 'react-native';
import { styles } from '../styles';

const StoryCircle = ({ label, uri, isNew=false }) => (
  <View style={styles.storyContainer}>
    <View style={[styles.storyCircle, isNew && styles.newStoryBorder]}>
      <Image source={uri} style={styles.storyImage} />
    </View>
    <Text style={styles.storyLabel}>{label}</Text>
  </View>
);

const StoriesBar = () => {
  const stories = [
    { label: 'Leo D2', uri: require('../assets/Leo-District-Logo-306-D11.png'), isNew: true },
    { label: 'Leo D3', uri: require('../assets/Leo-District-Logo-306-D2.png') },
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesBar} contentContainerStyle={{ paddingHorizontal: 15 }}>
      {stories.map((s, i) => <StoryCircle key={i} {...s} />)}
    </ScrollView>
  );
};

export default StoriesBar;
