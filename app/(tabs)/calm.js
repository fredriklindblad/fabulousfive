import React from 'react';
import { ScrollView, Text, StyleSheet, Image, Pressable, Linking } from 'react-native';
import { useGlobalStyles } from '@/globalStyles'; // ⬅️ ny hook

export default function CalmScreen() {
  const { styles: global, colors } = useGlobalStyles(); // ⬅️ hämta färger & stilar

  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/fabulousfive.se');
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={local.container}
    >
      <Image
        source={require('@/assets/calm-illustration.png')}
        style={local.image}
        resizeMode="contain"
      />
      <Text style={[local.title, { color: colors.primaryText }]}>Stillhet 🌿</Text>
      <Text style={[local.subtitle, { color: colors.secondaryText }]}>
        Din plats för återhämtning, fokus och lugn.
      </Text>
      <Text style={[local.text, { color: colors.primaryText }]}>
        Snart kan du utforska meditationer, andningsövningar och stilla stunder direkt i appen.
      </Text>
      <Pressable style={[local.button, { backgroundColor: '#DBBEC0' }]} onPress={openInstagram}>
        <Text style={local.buttonText}>Följ @fabulousfive.se</Text>
      </Pressable>
    </ScrollView>
  );
}

const local = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 0,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Lato',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Lato',
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Lato',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '600',
  },
});
