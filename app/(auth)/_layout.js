import React from 'react';
import { Stack } from 'expo-router';
import { Platform, View, StyleSheet, Image } from 'react-native';
import { VideoView } from 'expo-video';

export default function layout() {
  return (
    <View style={styles.container}>
      {/* 🎬 Bakgrundsvideo */}
      {Platform.OS === 'web' ? (
        <video
          src="/start-background.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={styles.webVideo}
        />
      ) : (
        <VideoView
          source={require('../../assets/start-background.mp4')}
          autoPlay
          muted
          loop
          resizeMode="cover"
          style={[StyleSheet.absoluteFill, { zIndex: -1 }]}
        />
      )}

      {/* 📷 Logga */}
      <Image
        source={require('../../assets/icon-ff.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* 🔝 Inloggningsstack */}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  webVideo: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    objectFit: 'cover',
    zIndex: -1,
  },
  logo: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    width: 160,
    height: 160,
    zIndex: 2,
  },
});
