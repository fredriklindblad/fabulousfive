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
      <View
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: 20,
          padding: 16,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 6,
          elevation: 3, // för Android
        }}
      >
        {thumbnail && (
          <Image
            source={{ uri: thumbnail }}
            style={{
              width: '100%',
              height: 150,
              borderRadius: 12,
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
