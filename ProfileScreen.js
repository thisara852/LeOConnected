import React from 'react'; 
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // <-- Use Ionicons

// --- Constants for Styling ---
const BG_DARK = '#000000';
const PRIMARY_GOLD = '#FFC107';
const TEXT_LIGHT = '#F3F4F6';
const DIVIDER = '#1F1F1F';
const INACTIVE_TEXT = '#9CA3AF';

// --- Reusable Setting Item Component ---
const SettingItem = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.itemLeft}>
      <Ionicons name={icon} size={20} color={PRIMARY_GOLD} />
      <Text style={styles.itemText}>{title}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color={INACTIVE_TEXT} />
  </TouchableOpacity>
);

// --- Main Profile Screen Component ---
const ProfileScreen = ({ navigation }) => {

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => console.log("User logged out") }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={BG_DARK} />

      {/* Header with Back & Logout Buttons */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={TEXT_LIGHT} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Settings</Text>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={22} color="#FF4D4D" />
        </TouchableOpacity>
      </View>

      {/* Profile section (User Info) */}
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/profile.webp')} // Ensure this path is correct
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>Thisara Jayamaha</Text>
          <Text style={styles.profileEmail}>leo.user@club.lk</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Primary Settings Items */}
      <View style={styles.list}>
        <SettingItem
          title="Account"
          icon="person-outline"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <SettingItem
          title="Notifications"
          icon="notifications-outline"
          onPress={() => navigation.navigate('NotificationScreen')}
        />
        <SettingItem title="Privacy & Security" icon="lock-closed-outline" onPress={() => { console.log('Privacy & Security Pressed'); }} />
        <SettingItem title="Appearance" icon="moon-outline" onPress={() => { console.log('Appearance Pressed'); }} />
        <SettingItem title="Language" icon="globe-outline" onPress={() => { console.log('Language Pressed'); }} />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Secondary Settings Items */}
      <View style={styles.list}>
        <SettingItem title="Help & Support" icon="help-circle-outline" onPress={() => { console.log('Help & Support Pressed'); }} />
        <SettingItem title="About" icon="information-circle-outline" onPress={() => { console.log('About Pressed'); }} />
      </View>
    </SafeAreaView>
  );
};

// --- Stylesheet ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG_DARK,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  logoutButton: {
    padding: 5,
  },
  headerTitle: {
    color: TEXT_LIGHT,
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 35,
    marginRight: 15,
    backgroundColor: '#222',
  },
  profileName: {
    color: TEXT_LIGHT,
    fontSize: 18,
    fontWeight: '600',
  },
  profileEmail: {
    color: INACTIVE_TEXT,
    fontSize: 14,
    marginTop: 3,
  },
  divider: {
    height: 1,
    backgroundColor: DIVIDER,
    marginVertical: 10,
  },
  list: {
    marginTop: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: DIVIDER,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    color: TEXT_LIGHT,
    fontSize: 16,
    marginLeft: 12,
  },
});

export default ProfileScreen;
