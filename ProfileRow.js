// components/ProfileRow.js
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import CustomAppIcon from './CustomAppIcon';
import { styles, PRIMARY_GOLD } from '../styles'; // ✅ Import PRIMARY_GOLD

const ProfileRow = ({ iconName, label, onPress, value, isDanger = false }) => (
  <TouchableOpacity onPress={onPress} style={styles.profileRow} activeOpacity={0.7}>
    <View style={styles.rowLeft}>
      <CustomAppIcon
        name={iconName}
        size={20}
        color={isDanger ? '#F87171' : PRIMARY_GOLD}
        style={{ width: 30 }}
      />
      <Text
        style={[
          styles.profileRowLabel,
          { color: isDanger ? '#F87171' : undefined },
        ]}
      >
        {label}
      </Text>
    </View>
    <View style={styles.rowRight}>
      {value && <Text style={styles.profileRowValue}>{value}</Text>}
      <CustomAppIcon name="chevron-right" size={18} color="#6B7280" />
    </View>
  </TouchableOpacity>
);

export default ProfileRow;
