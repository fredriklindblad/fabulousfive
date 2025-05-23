import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGlobalStyles } from '@/globalStyles';
import { useRouter } from 'expo-router';
import HeaderAvatar from '@/components/profile/HeaderAvatar';

export default function ProfileHeader({ name, interests, ffPoints = 0, profileImage, onEdit, onSettingsPress }) {
  const { colors } = useGlobalStyles();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.cardBackground }]}>
      <View style={styles.headerRow}>
        <Image
        source={
        profileImage && profileImage.startsWith('http')
            ? { uri: profileImage }
            : require('@/assets/default-avatar.png')
        }
        style={styles.avatar}
        />
        <View style={styles.infoColumn}>
          <Text style={[styles.name, { color: colors.primaryText }]}>{name || 'Ditt namn'}</Text>
          <View style={styles.interestsWrap}>
            {interests?.slice(0, 2).map((i) => (
              <Text key={i} style={[styles.interest, { color: colors.secondaryText }]}>
                {i}
              </Text>
            ))}
          </View>
          <Text style={[styles.points, { color: colors.primaryText }]}>{ffPoints} FF-poäng</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => router.push('/profile/edit')}>
          <Text style={[styles.editBtn, { color: colors.linkText }]}>Redigera profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  infoColumn: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontFamily: 'LatoBold',
    marginBottom: 4,
  },
  interestsWrap: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  interest: {
    fontSize: 14,
    fontFamily: 'Lato',
  },
  points: {
    fontSize: 14,
    fontFamily: 'LatoBold',
  },
  actions: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editBtn: {
    fontSize: 14,
    fontFamily: 'Lato',
    textDecorationLine: 'underline',
  },
});
