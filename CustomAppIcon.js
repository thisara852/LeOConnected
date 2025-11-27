// components/CustomAppIcon.js
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CustomAppIcon = ({ name, size = 20, color = '#F3F4F6', style }) => {
  let IconComponent = Icon;
  let iconName = '';

  switch (name) {
    case 'home': iconName = 'home-outline'; break;
    case 'search': iconName = 'search'; break;
    case 'bell': iconName = 'notifications-outline'; break;
    case 'user': iconName = 'person-outline'; break;
    case 'briefcase': iconName = 'briefcase-outline'; break;
    case 'calendar': iconName = 'calendar-outline'; break;
    case 'message': iconName = 'chatbox-outline'; break;
    case 'mail': iconName = 'mail-outline'; break;
    case 'lock': iconName = 'lock-closed-outline'; break;
    case 'logout': iconName = 'log-out-outline'; break;
    case 'settings': iconName = 'settings-outline'; break;
    case 'chevron-right': iconName = 'chevron-forward'; break;
    case 'menu': iconName = 'menu-outline'; break;
    case 'clock': iconName = 'time-outline'; break;
    case 'phone': iconName = 'call-outline'; break;
    case 'location': iconName = 'location-outline'; break;
    case 'sun': iconName = 'moon-outline'; break;
    case 'plus': iconName = 'add'; break;
    case 'heart': iconName = 'heart-outline'; break;
    case 'comment': iconName = 'chatbubble-outline'; break;
    case 'send': iconName = 'send-outline'; break;
    case 'link': iconName = 'link-outline'; break;
    case 'bookmark': iconName = 'bookmark-outline'; break;
    case 'eye': iconName = 'eye-outline'; break;
    case 'google': IconComponent = FontAwesome; iconName = 'google'; color = '#000'; break;
    case 'facebook': IconComponent = FontAwesome; iconName = 'facebook'; color = '#000'; break;
    case 'edit': IconComponent = FeatherIcon; iconName = 'edit-2'; break;
    case 'grid': IconComponent = FeatherIcon; iconName = 'grid'; break;
    default: iconName = 'alert-circle-outline';
  }

  return <IconComponent name={iconName} size={size} color={color} style={style} />;
};

export default CustomAppIcon;
