// styles.js
import { StyleSheet, Platform, StatusBar as RNStatusBar, Dimensions } from 'react-native';

export const PRIMARY_GOLD = '#FFC107';
export const BG_DARK = '#000000';
export const TEXT_LIGHT = '#F3F4F6';
export const INACTIVE_TAB_COLOR = '#9CA3AF';
export const SECONDARY_DARK = '#1E1E1E';

const getStatusBarHeight = () => (Platform.OS === 'android' ? RNStatusBar.currentHeight : 0);
const getBottomNavPadding = () => (Platform.OS === 'ios' ? 20 : 10);

export const styles = StyleSheet.create({
  // --- General App Styles ---
  appContainer: { flex: 1, backgroundColor: BG_DARK },
  container: { flex: 1, backgroundColor: BG_DARK, paddingTop: getStatusBarHeight() },
  bgDark: BG_DARK,

  // --- Bottom Navigation ---
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    backgroundColor: BG_DARK,
    borderTopColor: SECONDARY_DARK,
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: getBottomNavPadding(),
    width: '100%',
    height: Platform.OS === 'ios' ? 80 : 70,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  navItemCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    top: -15,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: PRIMARY_GOLD,
  },
  plusButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    marginTop: 2,
    color: INACTIVE_TAB_COLOR,
  },

  // --- Example Additional Styles ---
  splashContainer: { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  profileContainer: { flex: 1, backgroundColor: BG_DARK, padding: 20 },
  card: {
    backgroundColor: SECONDARY_DARK,
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
  },
  textLight: { color: TEXT_LIGHT },
  textFaded: { color: INACTIVE_TAB_COLOR },

  // Add more app-specific styles as needed
});
