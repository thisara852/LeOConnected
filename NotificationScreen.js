import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import CustomAppIcon from '../components/CustomAppIcon'; // Ensure path exists

// --- Color Constants ---
const BG_DARK = '#000';
const SECONDARY_DARK = '#111';
const PRIMARY_GOLD = '#FFC107';
const INACTIVE_TAB_COLOR = '#888';

// --- Icon Placeholder Component ---
const Icon = ({ name, size, color, style }) => (
  <Text
    style={[
      { fontSize: size, color: color, fontFamily: 'System', fontWeight: '500' },
      style,
    ]}
  >
    {name === 'arrow-back' && '←'}
    {name === 'notifications-outline' && '⍾'}
    {name === 'search-outline' && '🔍'}
  </Text>
);

// --- Notification Data ---
const NOTIFICATIONS_DATA = [
  { id: 'n1', title: 'Security Update', body: 'Update your token management system.', timestamp: 'Today at 9:42 AM', showButton: false, unread: true },
  { id: 'n2', title: 'New Event', body: 'Leadership Mentoring Program starts today.', timestamp: 'Today at 10:15 AM', showButton: true, unread: true },
  { id: 'n3', title: 'Verification Pending', body: 'Your account is pending verification.', timestamp: 'Today at 11:00 AM', showButton: false, unread: false },
  { id: 'n4', title: 'New Message', body: 'You have received a new message from Leo District.', timestamp: 'Yesterday at 4:30 PM', showButton: false, unread: true },
  { id: 'n5', title: 'Reminder', body: 'Don’t forget to complete your profile.', timestamp: 'Yesterday at 2:20 PM', showButton: true, unread: true },
  { id: 'n6', title: 'Event Update', body: 'Event timings have been updated.', timestamp: '2 days ago', showButton: false, unread: false },
  { id: 'n7', title: 'Security Alert', body: 'New login detected on your account.', timestamp: '2 days ago', showButton: false, unread: true },
  { id: 'n8', title: 'System Maintenance', body: 'System maintenance scheduled for tonight.', timestamp: '3 days ago', showButton: false, unread: false },
];

// --- Notification Item Component ---
const NotificationItem = ({ item }) => (
  <View style={styles.notificationContainer}>
    <View style={styles.notificationContent}>
      <View style={styles.iconCircle}>
        <Icon name="notifications-outline" size={20} color="#fff" />
      </View>

      <View style={styles.textWrapper}>
        <View style={styles.titleRow}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          {item.unread && <View style={styles.unreadDot} />}
        </View>

        <Text style={styles.notificationBody}>{item.body}</Text>
        <Text style={styles.notificationTime}>{item.timestamp}</Text>

        {item.showButton && (
          <TouchableOpacity style={styles.verifyButton}>
            <Text style={styles.verifyButtonText}>Verify now</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
    <View style={styles.notificationSeparator} />
  </View>
);

// --- Bottom Navigation Component ---

// --- Main Notifications Screen ---
const NotificationsScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [currentScreen, setCurrentScreen] = useState('Notification');

  const filteredNotifications = NOTIFICATIONS_DATA.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={BG_DARK} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeFeedScreen')} // back to HomeFeedScreen
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <TextInput
          style={styles.searchInput}
          placeholder="Search notifications"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.separator} />

      {/* Notifications List */}
      <FlatList
        data={filteredNotifications}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Navigation */}
    
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG_DARK },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, backgroundColor: SECONDARY_DARK },
  backButton: { marginRight: 10, padding: 5 },
  searchInput: { flex: 1, height: 40, backgroundColor: '#222', borderRadius: 8, paddingHorizontal: 10, color: '#fff', fontSize: 14 },
  separator: { height: 1, backgroundColor: '#333', width: '100%' },
  listContent: { paddingBottom: 80 }, // extra space for bottom nav
  notificationContainer: { paddingHorizontal: 15 },
  notificationContent: { flexDirection: 'row', paddingVertical: 15 },
  iconCircle: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', marginRight: 10, marginTop: 2 },
  textWrapper: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 5 },
  notificationTitle: { color: '#fff', fontSize: 16, fontWeight: '600', marginBottom: 2, flexShrink: 1 },
  unreadDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: PRIMARY_GOLD, marginLeft: 5 },
  notificationBody: { color: '#ccc', fontSize: 14, lineHeight: 20 },
  notificationTime: { color: '#666', fontSize: 12, marginTop: 5 },
  verifyButton: { backgroundColor: PRIMARY_GOLD, paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5, marginTop: 10, width: 120 },
  verifyButtonText: { color: '#000', textAlign: 'center', fontWeight: 'bold', fontSize: 14 },
  notificationSeparator: { height: 0.5, backgroundColor: '#1a1a1a' },

});

export default NotificationsScreen;
