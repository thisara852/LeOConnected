// components/ListItem.js
import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { styles } from '../styles';

const ListItem = ({ item }) => (
  <TouchableOpacity style={styles.listItemContainer}>
    <Image style={styles.entityImage} source={{ uri: item.imageUri }} />
    <View style={styles.textContainer}>
      <Text style={styles.entityName}>{item.name}</Text>
      {item.location && <Text style={styles.entityLocation}>{item.location}</Text>}
    </View>
  </TouchableOpacity>
);

export default ListItem;
