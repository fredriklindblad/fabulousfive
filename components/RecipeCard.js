import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useGlobalStyles } from '@/globalStyles'; // ⬅️ ny import

export default function RecipeCard({ id, title, description, image, thumbnail }) {
  const router = useRouter();
  const { styles } = useGlobalStyles(); // ⬅️ hämta stilar (färger följer med om du vill)

  const handlePress = () => {
    router.push(`/recipe/${id}`);
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.card}>
        {thumbnail && (
          <Image
            source={{ uri: thumbnail }}
            style={{
              width: '100%',
              height: 150,
              borderRadius: 8,
              marginBottom: 10,
            }}
          />
        )}
        <Text style={styles.cardTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.cardText} numberOfLines={3}>
          {description}
        </Text>
      </View>
    </Pressable>
  );
}
