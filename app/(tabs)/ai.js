import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGlobalStyles } from '@/globalStyles';

export default function AIScreen() {
  const { styles, colors } = useGlobalStyles();

  return (
    <View style={[local.container, { backgroundColor: colors.background }]}>
      <Text style={[local.header, { color: colors.primaryText }]}>Fabulous AI</Text>
      <Text style={[local.subtext, { color: colors.secondaryText }]}>
        Här kommer du snart kunna ställa frågor, få personligt stöd och inspiration – direkt från vår AI-assistent.
      </Text>

      <View style={local.comingSoon}>
        <Ionicons name="sparkles-outline" size={48} color={colors.primaryText} />
        <Text style={[local.comingText, { color: colors.primaryText }]}>Funktioner släpps snart</Text>
      </View>
    </View>
  );
}

const local = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'LatoBold',
    marginBottom: 16,
  },
  subtext: {
    fontSize: 16,
    fontFamily: 'Lato',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    maxWidth: 320,
  },
  comingSoon: {
    alignItems: 'center',
  },
  comingText: {
    fontSize: 16,
    fontFamily: 'Lato',
    marginTop: 12,
  },
});
