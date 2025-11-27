// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles';

const SplashScreen = ({ setScreen }) => {
  useEffect(() => {
    const t = setTimeout(() => setScreen('Onboarding'), 2000);
    return () => clearTimeout(t);
  }, [setScreen]);

  return (
    <View style={[styles.container, styles.splashContainer]}>
      <Image source={require('../assets/logo.png')} style={styles.splashLogo} />
      <Text style={styles.splashTitle}>LeoConnect</Text>
      <Text style={styles.splashSubtitle}>Sri Lanka</Text>
    </View>
  );
};

export default SplashScreen;
