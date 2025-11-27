// App.js
import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';

// Screens
import SplashScreen from './screens/SplashScreen';
import OnboardingFlow from './screens/OnboardingFlow';
import AuthScreen from './screens/AuthScreen';
import CompleteProfileScreen from './screens/CompleteProfileScreen';
import HomeFeedScreen from './screens/HomeFeedScreen';
import PostDetailScreen from './screens/PostDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfile';
import SearchScreen from './screens/SearchScreen';
import NotificationScreen from './screens/NotificationScreen';
import StoryViewScreen from './screens/StoryViewScreen';

// ⭐ NEWLY ADDED — IMPORTANT
import DistrictScreen from './screens/District';
import ClubsScreen from './screens/Clubs';

// Styles
import { styles } from './styles';

const App = () => {
  const [screen, setScreen] = useState('Splash');
  const [storyImage, setStoryImage] = useState(null);

  // ⭐ Screen params state
  const [params, setParams] = useState(null);

  // ⭐ Custom Navigation Handler
  const navigate = (name, screenParams = null) => {
    setParams(screenParams);
    setScreen(name);
  };

  const handleAuthSuccess = () => navigate('CompleteProfile');

  const handleIconClick = (icon) => {
    if (icon === 'Profile') navigate('EditProfile');
    if (icon === 'Setting') navigate('Profile');
  };

  const openStory = (imageUri) => {
    setStoryImage(imageUri);
    navigate('StoryView');
  };

  const closeStory = () => {
    setStoryImage(null);
    navigate('HomeFeed');
  };

  // 🔥 ALL SCREENS HANDLED HERE
  const renderScreen = () => {
    switch (screen) {
      case 'Splash':
        return <SplashScreen setScreen={navigate} />;

      case 'Onboarding':
        return <OnboardingFlow setScreen={navigate} />;

      case 'Login':
        return (
          <AuthScreen
            onLoginSuccess={handleAuthSuccess}
            onSignupSuccess={handleAuthSuccess}
          />
        );

      case 'CompleteProfile':
        return <CompleteProfileScreen setScreen={navigate} />;

      case 'HomeFeed':
        return (
          <HomeFeedScreen
            setScreen={navigate}
            openStory={openStory}
            handleIconClick={handleIconClick}
          />
        );

      case 'PostDetail':
        return <PostDetailScreen setScreen={navigate} />;

      case 'Profile':
        return <ProfileScreen setScreen={navigate} />;

      case 'EditProfile':
        return <EditProfileScreen setScreen={navigate} />;

      case 'Search':
        return <SearchScreen setScreen={navigate} />;

      case 'Notification':
        return <NotificationScreen setScreen={navigate} />;

      case 'StoryView':
        return (
          <StoryViewScreen
            storyImage={storyImage}
            navigation={{ goBack: closeStory }}
            onClose={closeStory}
            setScreen={navigate}
          />
        );

      // ⭐✔ NEWLY ADDED — NOW IT WORKS
      case 'District':
        return (
          <DistrictScreen
            setScreen={navigate}
            districtId={params?.districtId}
            districtName={params?.districtName}
          />
        );

      // ⭐ Optional for clubs
      case 'Clubs':
        return (
          <ClubsScreen
            setScreen={navigate}
            clubId={params?.clubId}
            clubName={params?.clubName}
          />
        );

      default:
        return (
          <HomeFeedScreen
            setScreen={navigate}
            openStory={openStory}
            handleIconClick={handleIconClick}
          />
        );
    }
  };

  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {renderScreen()}
    </View>
  );
};

export default App;
