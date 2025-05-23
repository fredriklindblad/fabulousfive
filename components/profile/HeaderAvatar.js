import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';

export default function HeaderAvatar() {
  const router = useRouter();
  const user = useUser();

  return (
    <Pressable
      onPress={() => router.push('/profile')}
      style={{
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: 5,
        marginTop: -20,
        position: 'absolute',
        right: 0,
        top: 8,
      }}
    >
      <Image
        source={
          user?.image
            ? { uri: user.image }
            : require('@/assets/default-avatar.png')
        }
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          marginBottom: 2,
          backgroundColor: '#ccc',
        }}
      />
    </Pressable>
  );
}
