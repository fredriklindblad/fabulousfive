// components/ProfileBox.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderAvatar from '@/components/profile/HeaderAvatar';

export default function ProfileBox({ name, interests = [], points = 0, onEdit, colors }) {
  return (
    <View style={[styles.container, { backgroundColor: colors.cardBackground }]}>
      <View style={styles.row}>
        <HeaderAvatar size={72} />
        <View style={styles.infoSection}>
          <Text style={[styles.name, { color: colors.primaryText }]}>{name}</Text>

          <View style={styles.interestsWrapper}>
            {interests.map((interest) => (
              <View key={interest} style={[styles.tag, { backgroundColor: colors.background }]}>
                <Text style={[styles.tagText, { color: colors.primaryText }]}>{interest}</Text>
              </View>
            ))}
          </View>

          <Text style={[styles.points, { color: colors.secondaryText }]}>FF-poäng: {points}</Text>
        </View>

        <TouchableOpacity onPress={onEdit} style={styles.editIcon}>
          <Ionicons name="create-outline" size={20} color={colors.primaryText} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoSection: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontFamily: 'LatoBold',
    marginBottom: 6,
  },
  interestsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 4,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Lato',
  },
  points: {
    fontSize: 14,
    fontFamily: 'LatoItalic',
  },
  editIcon: {
    padding: 8,
  },
});
