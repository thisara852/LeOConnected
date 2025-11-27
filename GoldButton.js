// components/GoldButton.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles';

const GoldButton = ({ children, onPress, style, textStyle, disabled = false }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.goldButton, disabled && { opacity: 0.6 }, style]}
    activeOpacity={disabled ? 1 : 0.8}
    disabled={disabled}
  >
    <Text style={[styles.goldButtonText, textStyle]}>{children}</Text>
  </TouchableOpacity>
);

export default GoldButton;
