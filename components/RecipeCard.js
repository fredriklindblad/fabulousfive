import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useGlobalStyles } from '@/globalStyles';

export default function RecipeCard({ id, title, description, image, thumbnail }) {
  const router = useRouter();
  const { styles, colors } = useGlobalStyles();

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
        <Text
          style={{
            fontFamily: 'LatoBold',
            fontSize: 16,
            color: colors.primaryText,
            marginBottom: 4,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
        {description && (
          <Text
            style={{
              fontFamily: 'Lato',
              fontSize: 14,
              color: colors.secondaryText,
              lineHeight: 20,
            }}
            numberOfLines={3}
          >
            {description}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
