// Komponent för att visa ett feed-item
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../globalStyles';

export default function FeedItem({ title, description }) {
    return (
      <View style={GlobalStyles.card}>
        <Text style={GlobalStyles.cardTitle}>{title}</Text>
        <Text style={GlobalStyles.cardText}>{description}</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 16
  }
});
