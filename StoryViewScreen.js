import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, StyleSheet, Image, TouchableWithoutFeedback, 
  Dimensions, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Animated, ImageBackground
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import LeoDistrictImage from '../assets/Leo-District-Logo-306-D2.png';
import BackgroundImage from '../assets/qw.jpg'; // <-- Add your background image here

// --- Configuration ---
const { width, height } = Dimensions.get('window');
const STATUS_DURATION_MS = 5000; 

// --- Mock Data ---
const ALL_STATUS_DATA = [
  {
    userId: 'u1',
    name: 'Leo District',
    avatarUri: LeoDistrictImage,
    statuses: [
      { id: 's1', mediaUri: 'https://via.placeholder.com/600x800/FF6347/FFFFFF?text=Story1', time: '5m ago' },
    ],
  },
  {
    userId: 'u2',
    name: 'Friend B',
    avatarUri: 'https://via.placeholder.com/50/20B2AA/FFFFFF?text=B',
    statuses: [
      { id: 's2', mediaUri: 'https://via.placeholder.com/600x800/20B2AA/FFFFFF?text=Story2', time: '10m ago' },
    ],
  },
];

// --- Status Progress Bar ---
const StatusProgressBar = ({ isActive, isSeen, duration, onFinish, isPaused }) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      if (isPaused) { animation.stopAnimation(); return; }
      animation.setValue(0);
      Animated.timing(animation, { toValue: 1, duration: duration || STATUS_DURATION_MS, useNativeDriver: false })
        .start(({ finished }) => { if (finished) onFinish(); });
    } else if (isSeen) { animation.setValue(1); } 
    else { animation.setValue(0); }
    return () => animation.stopAnimation();
  }, [isActive, isSeen, isPaused]);

  const progressWidth = animation.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  const trackStyle = isSeen ? progressStyles.seenTrack : progressStyles.unseenTrack;

  return (
    <View style={[progressStyles.barContainer, trackStyle]}>
      {(isActive || isSeen) && <Animated.View style={[progressStyles.progressBar, { width: progressWidth }]} />}
    </View>
  );
};

const progressStyles = StyleSheet.create({
  barContainer: { height: 4, flex: 1, marginHorizontal: 2, borderRadius: 2, overflow: 'hidden' },
  unseenTrack: { backgroundColor: 'rgba(255,255,255,0.5)' },
  seenTrack: { backgroundColor: 'rgba(255,255,255,0.8)' },
  progressBar: { height: '100%', backgroundColor: 'white' },
});

// --- Status Viewer (Single User) ---
const StatusViewerScreen = ({ userStories, onClose, onNextUser, onPrevUser }) => {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [heartActive, setHeartActive] = useState(false);
  const [smileActive, setSmileActive] = useState(false);

  const currentStatus = userStories.statuses[currentStatusIndex];
  const isLastStatus = currentStatusIndex === userStories.statuses.length - 1;

  const handleNextStatus = () => { if (!isLastStatus) setCurrentStatusIndex(prev => prev + 1); else onNextUser(); };
  const handlePrevStatus = () => { if (currentStatusIndex > 0) setCurrentStatusIndex(prev => prev - 1); else onPrevUser(); };

  const handlePress = (e) => {
    if (isPaused) return;
    const pressX = e.nativeEvent.locationX;
    pressX > width / 2 ? handleNextStatus() : handlePrevStatus();
  };
  const handleLongPress = () => setIsPaused(true);
  const handlePressOut = () => { if (!replyText) setIsPaused(false); };

  const sendReply = () => { console.log(`Reply to ${userStories.name}: ${replyText}`); setReplyText(''); setIsPaused(false); };
  const sendReaction = (emoji) => { console.log(`Reaction to ${userStories.name}: ${emoji}`); onClose(); };

  const renderProgressBars = () => (
    <View style={viewerStyles.statusBarContainer}>
      {userStories.statuses.map((status, index) => (
        <StatusProgressBar
          key={status.id}
          isActive={index === currentStatusIndex}
          isSeen={index < currentStatusIndex}
          isPaused={isPaused}
          onFinish={handleNextStatus}
          duration={status.duration}
        />
      ))}
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={handlePress} onLongPress={handleLongPress} onPressOut={handlePressOut}>
      <ImageBackground source={BackgroundImage} style={viewerStyles.container}>
        {/* Story Image */}
        {currentStatus?.mediaUri && (
          <Image source={{ uri: currentStatus.mediaUri }} style={viewerStyles.media} resizeMode="cover" />
        )}

        {/* Header */}
        <View style={viewerStyles.header}>
          {renderProgressBars()}
          <View style={viewerStyles.userInfo}>
            <Image source={userStories.avatarUri} style={viewerStyles.avatar} />
            <Text style={viewerStyles.userName}>{userStories.name}</Text>
            <Text style={viewerStyles.timeText}>{currentStatus?.time}</Text>
            <Ionicons name="close" size={30} color="white" onPress={onClose} style={viewerStyles.closeButton} />
          </View>
        </View>

        {/* Footer */}
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={viewerStyles.footerContainer}>
          <View style={viewerStyles.reactionContainer}>
            <TouchableOpacity onPress={() => { setHeartActive(!heartActive); sendReaction('❤️'); }}>
              <Text style={[viewerStyles.reactionText, { color: heartActive ? 'red' : 'white' }]}>❤️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setSmileActive(!smileActive); sendReaction('😂'); }}>
              <Text style={[viewerStyles.reactionText, { color: smileActive ? '#FFD700' : 'white' }]}>😂</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sendReaction('🔥')}>
              <Text style={viewerStyles.reactionText}>🔥</Text>
            </TouchableOpacity>
          </View>

          <View style={viewerStyles.replyInputContainer}>
            <Feather name="camera" size={24} color="white" style={{ marginRight: 10 }} />
            <TextInput
              style={viewerStyles.replyInput}
              placeholder={`Reply to ${userStories.name}...`}
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={replyText}
              onChangeText={setReplyText}
              onFocus={() => setIsPaused(true)}
              onBlur={() => !replyText && setIsPaused(false)}
            />
            <TouchableOpacity onPress={sendReply} disabled={!replyText.trim()}>
              <Ionicons name="send" size={24} color={replyText.trim() ? 'white' : 'rgba(255,255,255,0.4)'} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const viewerStyles = StyleSheet.create({
  container: { flex: 1 },
  media: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  header: { position: 'absolute', top: 0, width: '100%', paddingTop: 40, zIndex: 10 },
  statusBarContainer: { flexDirection: 'row', paddingHorizontal: 5, marginBottom: 8 },
  userInfo: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  avatar: { width: 35, height: 35, borderRadius: 17.5, marginRight: 10 },
  userName: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  timeText: { color: 'rgba(255, 255, 255, 0.7)', fontSize: 14, marginLeft: 5 },
  closeButton: { position: 'absolute', right: 15 },
  footerContainer: { position: 'absolute', bottom: 0, width: '100%', paddingHorizontal: 15, paddingBottom: Platform.OS === 'ios' ? 30 : 15, paddingTop: 10, backgroundColor: 'rgba(0,0,0,0.3)' },
  reactionContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  reactionText: { fontSize: 30 },
  replyInputContainer: { flexDirection: 'row', alignItems: 'center' },
  replyInput: { flex: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20, paddingHorizontal: 15, marginRight: 10, color: 'white' },
});

// --- Main Component ---
const FullStatusViewer = ({ navigation, route }) => {
  const initialUserId = route?.params?.initialUserId || ALL_STATUS_DATA[0].userId;
  const initialIndex = ALL_STATUS_DATA.findIndex(u => u.userId === initialUserId);
  const [currentUserIndex, setCurrentUserIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

  const currentUserStories = ALL_STATUS_DATA[currentUserIndex];
  const isLastUser = currentUserIndex === ALL_STATUS_DATA.length - 1;
  const isFirstUser = currentUserIndex === 0;

  const handleClose = () => navigation.goBack();
  const handleNextUser = () => { if (!isLastUser) setCurrentUserIndex(prev => prev + 1); else handleClose(); };
  const handlePrevUser = () => { if (!isFirstUser) setCurrentUserIndex(prev => prev - 1); };

  if (!currentUserStories) return (
    <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white' }}>Status not found.</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusViewerScreen
        key={currentUserStories.userId}
        userStories={currentUserStories}
        onClose={handleClose}
        onNextUser={handleNextUser}
        onPrevUser={handlePrevUser}
      />
    </View>
  );
};

export default FullStatusViewer;
