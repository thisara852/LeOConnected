// screens/OnboardingFlow.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const PRIMARY_GOLD = '#FFC107';
const BG_DARK = '#000000';
const TEXT_LIGHT = '#F3F4F6';
const SUBTEXT = '#D1D5DB';

const stepsData = [
  {
    title: 'Welcome to LeoConnect',
    subtitle: 'Connect Leo Clubs across Sri Lanka and the Maldives.',
    image: require('../assets/logo.png'),
  },
  {
    title: 'Connect & Collaborate',
    subtitle: 'Explore projects, events, and resources.',
    image: require('../assets/logo.png'),
  },
  {
    title: 'Get Verified',
    subtitle: 'Verify your Leo membership to unlock features.',
    image: require('../assets/logo.png'),
  },
  {
    title: 'Stay Connected',
    subtitle: 'Follow clubs, districts and never miss an event.',
    image: require('../assets/logo.png'),
  },
];

const OnboardingFlow = ({ setScreen }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < stepsData.length - 1) setStep(step + 1);
    else setScreen('Login');
  };

  const cur = stepsData[step];

  // Bigger logo for iPhone screens
  const logoSize = Math.min(width * 0.55, 260); // 55% of screen width

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.center}>
        
        {/* BIGGER LOGO */}
        <Image
          source={cur.image}
          style={[styles.logo, { width: logoSize, height: logoSize }]}
          resizeMode="contain"
        />

        {/* Middle content */}
        <View style={styles.contentWrapper}>
          
          {/* Dots */}
          <View style={styles.dotsRow}>
            {stepsData.map((_, i) => (
              <View
                key={i}
                style={i === step ? styles.dotActive : styles.dotInactive}
              />
            ))}
          </View>

          <Text style={styles.title}>{cur.title}</Text>
          <Text style={styles.subtitle}>{cur.subtitle}</Text>

          {/* Next Button */}
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextBtnText}>{'›'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BG_DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },

  center: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  logo: {
    marginBottom: 30,
  },

  contentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },

  dotsRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },

  dotActive: {
    width: 30,
    height: 6,
    borderRadius: 10,
    backgroundColor: PRIMARY_GOLD,
    marginHorizontal: 5,
  },

  dotInactive: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#333',
    marginHorizontal: 5,
  },

  title: {
    color: TEXT_LIGHT,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    color: SUBTEXT,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },

  nextBtn: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: PRIMARY_GOLD,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },

  nextBtnText: {
    fontSize: 40,
    fontWeight: '900',
    color: '#000',
    marginTop: -3,
  },
});

export default OnboardingFlow;