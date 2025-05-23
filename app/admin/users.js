import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { fetchAllUsers, auth } from '@/services/firebase';
import { useGlobalStyles } from '@/globalStyles';
import { onAuthStateChanged } from 'firebase/auth';

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const { styles: global, colors } = useGlobalStyles();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user || user.email !== 'fredrik-lindblad@hotmail.com') {
        setUnauthorized(true);
        return;
      }
      const result = await fetchAllUsers();
      setUsers(result);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (unauthorized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>Åtkomst nekad</Text>
      </View>
    );
  }

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
      <Text style={[styles.title, { color: colors.primaryText }]}>Alla användare</Text>
      {users.map((user) => (
        <View key={user.id} style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.name, { color: colors.primaryText }]}>{user.name || 'Namnlös'}</Text>
          <Text style={[styles.email, { color: colors.secondaryText }]}>{user.email}</Text>
          <Text style={[styles.label, { color: colors.secondaryText }]}>Språk: {user.lang}</Text>
          <Text style={[styles.label, { color: colors.secondaryText }]}>Tema: {user.theme}</Text>
          <Text style={[styles.label, { color: colors.secondaryText }]}>Födelseår: {user.birthyear}</Text>
          <Text style={[styles.label, { color: colors.secondaryText }]}>
            Intressen: {user.interests?.join(', ')}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: 'LatoBold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontFamily: 'LatoBold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    fontFamily: 'Lato',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Lato',
    marginBottom: 2,
  },
});
