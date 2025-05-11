import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { GlobalStyles } from '@/globalStyles';

export default function RecipeCard({ id, title, description, image }) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/recipe/${id}`);
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={GlobalStyles.card}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: '100%',
              height: 150,
              borderRadius: 8,
              marginBottom: 10,
            }}
          />
        )}
        <Text style={GlobalStyles.cardTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={GlobalStyles.cardText} numberOfLines={3}>
          {description}
        </Text>
      </View>
    </Pressable>
  );
}
