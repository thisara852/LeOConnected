// --- AuthModule.js ---
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PRIMARY_GOLD = '#FFC107';
const BG_DARK = '#000000';
const TEXT_LIGHT = '#F3F4F6';
const INACTIVE_TAB_COLOR = '#9CA3AF';

// --- Custom Icon Component ---
const CustomAppIcon = ({ name, size = 20, color = TEXT_LIGHT, style }) => {
  let IconComponent = Icon;
  let iconName = '';

  switch (name) {
    case 'eye':
      iconName = 'eye-outline';
      break;
    case 'google':
      IconComponent = FontAwesome;
      iconName = 'google';
      color = '#000';
      break;
    case 'facebook':
      IconComponent = FontAwesome;
      iconName = 'facebook';
      color = '#000';
      break;
    case 'mail':
      IconComponent = FontAwesome;
      iconName = 'envelope';
      color = '#000';
      break;
    default:
      iconName = 'alert-circle-outline';
  }

  return (
    <IconComponent name={iconName} size={size} color={color} style={style} />
  );
};

// --- Button Component ---
const GoldButton = ({
  children,
  onPress,
  style,
  textStyle,
  disabled = false,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.goldButton, disabled && styles.disabledButton, style]}
    activeOpacity={disabled ? 1 : 0.8}
    disabled={disabled}>
    <Text style={[styles.goldButtonText, textStyle]}>{children}</Text>
  </TouchableOpacity>
);

// --- Input Component ---
const DarkInput = ({
  placeholder,
  iconName,
  value,
  onChangeText,
  secureTextEntry = false,
  label,
}) => (
  <View style={{ width: '100%', marginBottom: 15 }}>
    {label && <Text style={styles.authInputLabel}>{label}</Text>}
    <View style={styles.authInputContainer}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={styles.authInput}
      />
      {iconName === 'eye' && (
        <TouchableOpacity>
          <CustomAppIcon name={iconName} size={20} color="#6B7280" />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

// --- Login Form ---
const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.length > 0 && password.length > 5) {
      onLogin(); // call parent callback
    } else {
      Alert.alert(
        'Login Failed',
        'Please enter a valid username and password.'
      );
    }
  };

  return (
    <View style={styles.authFormContainer}>
      <DarkInput
        label="Username :"
        placeholder="Enter your Username"
        value={username}
        onChangeText={setUsername}
      />
      <DarkInput
        label="Password :"
        placeholder="Enter your Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        iconName="eye"
      />

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot password</Text>
      </TouchableOpacity>

      <GoldButton onPress={handleLogin} style={styles.loginButton}>
        Login
      </GoldButton>

      
    </View>
  );
};

// --- Signup Form ---
const SignupForm = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (username && email && password && password === confirmPassword) {
      onSignup();
    } else {
      Alert.alert(
        'Signup Failed',
        'Please fill all fields and ensure passwords match.'
      );
    }
  };

  return (
    <View style={styles.authFormContainer}>
      <DarkInput
        label="Username :"
        placeholder="Enter your Username"
        value={username}
        onChangeText={setUsername}
      />
      <DarkInput
        label="Email :"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <DarkInput
        label="Create Password :"
        placeholder="Enter your Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        iconName="eye"
      />
      <DarkInput
        label="Confirm Password :"
        placeholder="Confirm your Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        iconName="eye"
      />

      <GoldButton onPress={handleSignup} style={styles.signupButton}>
        Signup
      </GoldButton>
    </View>
  );
};

// --- Main Auth Screen ---
const AuthScreen = ({ onLoginSuccess, onSignupSuccess }) => {
  const [activeTab, setActiveTab] = useState('Login');

  return (
    <SafeAreaView style={styles.authContainer}>
      <StatusBar barStyle="light-content" backgroundColor={BG_DARK} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 20,
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.authLogoSmall}
        />
        <Text style={styles.authLogoText}>LeoConnect</Text>

        {/* Tab Switcher */}
        <View style={styles.authTabSwitcher}>
          <TouchableOpacity
            style={styles.authTabItem}
            onPress={() => setActiveTab('Login')}>
            <Text
              style={[
                styles.authTabText,
                activeTab === 'Login' && styles.authTabTextActive,
              ]}>
              Login
            </Text>
            {activeTab === 'Login' && <View style={styles.authTabIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.authTabItem}
            onPress={() => setActiveTab('Signup')}>
            <Text
              style={[
                styles.authTabText,
                activeTab === 'Signup' && styles.authTabTextActive,
              ]}>
              Signup
            </Text>
            {activeTab === 'Signup' && <View style={styles.authTabIndicator} />}
          </TouchableOpacity>
        </View>

        {/* Render Active Form */}
        {activeTab === 'Login' ? (
          <LoginForm onLogin={onLoginSuccess} />
        ) : (
          <SignupForm onSignup={onSignupSuccess} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  authContainer: { flex: 1, backgroundColor: BG_DARK },
  authLogoSmall: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  authLogoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: PRIMARY_GOLD,
    marginBottom: 25,
  },
  authTabSwitcher: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    width: '80%',
  },
  authTabItem: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  authTabText: { color: INACTIVE_TAB_COLOR, fontSize: 16 },
  authTabTextActive: { color: PRIMARY_GOLD, fontWeight: 'bold' },
  authTabIndicator: {
    height: 3,
    width: '100%',
    backgroundColor: PRIMARY_GOLD,
    marginTop: 5,
  },
  authFormContainer: { width: '80%', marginTop: 20 },
  authInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  authInputLabel: { color: TEXT_LIGHT, marginBottom: 5 },
  authInput: { flex: 1, color: TEXT_LIGHT, height: 45 },
  goldButton: {
    backgroundColor: PRIMARY_GOLD,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  goldButtonText: { color: '#000', fontWeight: 'bold' },
  disabledButton: { opacity: 0.6 },
  loginButton: { marginTop: 20 },
  signupButton: { marginTop: 20 },
  forgotPassword: { alignSelf: 'flex-end', marginVertical: 5 },
  forgotPasswordText: { color: PRIMARY_GOLD },
 
});

export default AuthScreen;