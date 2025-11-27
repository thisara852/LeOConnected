// components/DarkInput.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import CustomAppIcon from './CustomAppIcon';
import { styles } from '../styles';

const DarkInput = ({ placeholder, iconName, value, onChangeText, secureTextEntry = false, multiline = false, label }) => (
  <View style={{ width: '100%', marginBottom: 15 }}>
    {label && <Text style={styles.authInputLabel}>{label}</Text>}
    <View style={[styles.authInputContainer, multiline && { height: 100, alignItems: 'flex-start' }]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={[styles.authInput, multiline && { height: '100%', paddingTop: 5 }]}
        multiline={multiline}
      />
      {iconName === 'eye' && (
        <TouchableOpacity>
          <CustomAppIcon name={iconName} size={20} color="#6B7280" />
        </TouchableOpacity>
      )}
      {placeholder && placeholder.includes('Select') && (
        <CustomAppIcon name="chevron-right" size={20} color="#6B7280" style={{ transform: [{ rotate: '90deg' }] }} />
      )}
    </View>
  </View>
);

export default DarkInput;
