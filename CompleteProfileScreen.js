import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput, // <-- IMPORT ADDED
  StatusBar as RNStatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PRIMARY_GOLD = '#FFC107';
const BG_DARK = '#000000';
const TEXT_LIGHT = '#F3F4F6';
const INACTIVE_TAB_COLOR = '#9CA3AF';
const SECONDARY_DARK = '#1F1F1F';

const CustomAppIcon = ({ name, size = 20, color = TEXT_LIGHT }) => (
  <Icon name={name} size={size} color={color} />
);

const DarkInput = ({ label, placeholder, value, onChangeText }) => (
  <View style={{ width: '100%', marginBottom: 15 }}>
    {label && <Text style={{ color: TEXT_LIGHT, marginBottom: 5 }}>{label}</Text>}
    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#333', borderRadius: 8, paddingHorizontal: 10 }}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        value={value}
        onChangeText={onChangeText}
        style={{ flex: 1, color: TEXT_LIGHT, height: 45 }}
      />
    </View>
  </View>
);

const GoldButton = ({ children, onPress, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[{ backgroundColor: PRIMARY_GOLD, paddingVertical: 12, borderRadius: 8, marginTop: 10, alignItems: 'center' }, style]}
  >
    <Text style={{ color: '#000', fontWeight: 'bold' }}>{children}</Text>
  </TouchableOpacity>
);

const CompleteProfileScreen = ({ setScreen }) => {
  const [club, setClub] = useState('');
  const [year, setYear] = useState('');
  const [role, setRole] = useState('');

  const handleSave = () => {
    setScreen('HomeFeed'); 
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_DARK }}>
      <RNStatusBar barStyle="light-content" backgroundColor={BG_DARK} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 30, paddingVertical: 20, paddingBottom: 100 }}>
        
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
          <TouchableOpacity onPress={() => setScreen('Login')} style={{ marginRight: 15 }}>
            <Icon name="chevron-back-outline" size={24} color={TEXT_LIGHT} />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: TEXT_LIGHT }}>Complete Your Profile</Text>
        </View>
        <Text style={{ fontSize: 14, color: INACTIVE_TAB_COLOR, marginBottom: 30, paddingLeft: 40 }}>
          Help us personalize your experience
        </Text>

        {/* Avatar */}
        <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: SECONDARY_DARK, alignSelf: 'center', marginVertical: 30, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../assets/profile.webp')} 
            style={{ width: 100, height: 100, borderRadius: 50, resizeMode: 'cover' }}
          />
          <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: PRIMARY_GOLD, padding: 8, borderRadius: 15, borderWidth: 2, borderColor: BG_DARK }}>
            <CustomAppIcon name="pencil-outline" size={16} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Profile Inputs */}
        <DarkInput label="Enter Club :" placeholder="Enter your club name" value={club} onChangeText={setClub} />
        <DarkInput label="Year :" placeholder="Select your year" value={year} onChangeText={setYear} />
        <DarkInput label="LEO Club Role :" placeholder="Select your LEO club role" value={role} onChangeText={setRole} />

        <GoldButton onPress={handleSave} style={{ marginTop: 40, height: 50 }}>
          Save & Continue
        </GoldButton>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompleteProfileScreen;