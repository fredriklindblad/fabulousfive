import React from 'react';
import { View, Text } from 'react-native';
import { useGlobalStyles } from '@/globalStyles'; // ⬅️ ny hook

export default function MoveItem({ title, description }) {
  const { styles } = useGlobalStyles(); // ⬅️ använder dynamiska stilar

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{description}</Text>
    </View>
  );
}
