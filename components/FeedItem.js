// components/FeedItem.js
import React from 'react';
import { View, Text } from 'react-native';
import { GlobalStyles } from '@/globalStyles';

export default function FeedItem({ title, description }) {
  return (
    <View style={GlobalStyles.card}>
      <Text style={GlobalStyles.cardTitle}>{title}</Text>
      <Text style={GlobalStyles.cardText}>{description}</Text>
    </View>
  );
}
