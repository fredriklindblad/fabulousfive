import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Linking } from 'react-native';
import { GlobalColors, GlobalStyles } from '@/globalStyles';

export default function CalmScreen() {
  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/fabulousfive.se');
  };

  return (
    <View style={[styles.container, { backgroundColor: GlobalColors.background }]}>
      <Image
        source={require('@/assets/calm-illustration.png')} // Byt till en lugn illustration (t.ex. sittande person, natur etc.)
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Stillhet 🌿</Text>
      <Text style={styles.subtitle}>Din plats för återhämtning, fokus och lugn.</Text>
      <Text style={styles.text}>
        Snart kan du utforska meditationer, andningsövningar och stilla stunder direkt i appen.
      </Text>
      <Pressable style={styles.button} onPress={openInstagram}>
        <Text style={styles.buttonText}>Följ @fabulousfive.se</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Lato',
    color: GlobalColors.primaryText,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Lato',
    color: GlobalColors.secondaryText,
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Lato',
    color: GlobalColors.primaryText,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: GlobalColors.primaryText,
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
