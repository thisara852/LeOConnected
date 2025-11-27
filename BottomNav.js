// components/BottomNav.js
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles, PRIMARY_GOLD, INACTIVE_TAB_COLOR, BG_DARK } from '../styles';

const BottomNav = ({ currentScreen, setScreen, navigation }) => {
  const navItems = [
    { name: 'HomeFeed', icon: 'home-outline', activeIcon: 'home' },
    { name: 'Notification', icon: 'notifications-outline', activeIcon: 'notifications' },
    { name: 'Create', icon: 'add', activeIcon: 'add' },
    { name: 'Search', icon: 'search', activeIcon: 'search' },
    { name: 'EditProfile', icon: 'person-outline', activeIcon: 'person' },
  ];

  const handleNavClick = (screenName) => {
    if (screenName === 'EditProfile') {
      navigation.navigate('ProfileScreen'); // ✅ Safe navigation
    } else if (['HomeFeed', 'Search', 'Notification'].includes(screenName)) {
      setScreen(screenName);
    } else if (screenName === 'Create') {
      console.log('Open create modal or screen');
    }
  };

  return (
    <View style={styles.bottomNav}>
      {navItems.map((item) => {
        const isActive = currentScreen === item.name;
        const color = isActive ? PRIMARY_GOLD : INACTIVE_TAB_COLOR;

        if (item.name === 'Create') {
          return (
            <TouchableOpacity
              key={item.name}
              style={styles.navItemCenter}
              onPress={() => handleNavClick(item.name)}
            >
              <View style={styles.plusButton}>
                <Icon name={item.activeIcon} size={30} color={BG_DARK} />
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={item.name}
            style={styles.navItem}
            onPress={() => handleNavClick(item.name)}
          >
            <Icon name={isActive ? item.activeIcon : item.icon} size={24} color={color} />
            <Text style={[styles.navLabel, { color }]}>
              {item.name === 'Notification'
                ? 'Ntf.'
                : item.name === 'EditProfile'
                ? 'Me'
                : item.name === 'HomeFeed'
                ? 'Home'
                : 'Search'}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNav;
