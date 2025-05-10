// Komponent för att visa recept
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function RecipeCard({ title, description, image }) {
  return (
    <View style={styles.card}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text numberOfLines={1} style={styles.title}>{title}</Text>
      <Text numberOfLines={3}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff3e6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 16
  }
});

