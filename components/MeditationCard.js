import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useGlobalStyles } from '@/globalStyles';

export default function MeditationCard({ id, title, description, thumbnail }) {
  const router = useRouter();
  const { colors } = useGlobalStyles();

  const handlePress = () => {
    console.log('idSSSSSSSSSSSSSSSSS', id);
    router.push(`/meditation/${id}`);
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={{
        backgroundColor: colors.cardBackground,
        borderRadius: 20,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
      }}>
        {thumbnail && (
          <Image
            source={{ uri: thumbnail }}
            style={{
              width: '100%',
              height: 140,
              borderRadius: 12,
              marginBottom: 10,
            }}
          />
        )}
        <Text style={{
          fontFamily: 'LatoBold',
          fontSize: 16,
          color: colors.primaryText,
          marginBottom: 4,
        }}>
          {title}
        </Text>
        {description && (
          <Text style={{
            fontFamily: 'Lato',
            fontSize: 14,
            color: colors.secondaryText,
            lineHeight: 20,
          }} numberOfLines={3}>
            {description}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
