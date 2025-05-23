import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useGlobalStyles } from '@/globalStyles';
import { auth } from '@/services/firebase';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AdminHomeScreen() {
  const router = useRouter();
  const { colors } = useGlobalStyles();
  const user = auth.currentUser;

  if (!user || user.email !== 'fredrik-lindblad@hotmail.com') {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>⛔ Åtkomst nekad</Text>
      </View>
    );
  }

  const navButton = (label, route) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.primaryText }]}
      onPress={() => router.push(route)}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        {/* Tillbakaknapp */}
        <Pressable
          onPress={() => router.push('/(tabs)/profile')}
          style={{
            position: 'absolute',
            top: 40,
            right: 20,
            zIndex: 10,
            backgroundColor: colors.cardBackground,
            padding: 8,
            borderRadius: 30,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
          }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primaryText} />
        </Pressable>

        <Text style={[styles.title, { color: colors.primaryText }]}>Adminpanel</Text>

        {navButton('🧘 Meditationer', '/admin/meditations')}
        {navButton('🥗 Recept', '/admin/recipes')}
        {navButton('💬 Reflektionsfrågor', '/admin/questions')}
        {navButton('👥 Användare', '/admin/users')}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'LatoBold',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'LatoBold',
  },
});
