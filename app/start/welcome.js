import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useGlobalStyles } from '@/globalStyles';
import { VideoView } from 'expo-video';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { styles: global, colors } = useGlobalStyles();

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* 🎬 Bakgrundsvideo */}
      {Platform.OS === 'web' ? (
        <video
          src="/start-background.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={stylesWeb.webVideo}
        />
      ) : (
        <VideoView
          source={require('../../assets/start-background.mp4')}
          shouldPlay
          isMuted
          isLooping
          resizeMode="cover"
          style={[StyleSheet.absoluteFill, { zIndex: -1 }]}
        />
      )}

      {/* 🧭 Overlay */}
      <SafeAreaView style={local.overlay} edges={['top', 'bottom', 'left', 'right']}>
        <View style={local.topArea}>
          <Image
            source={require('../../assets/icon-ff.png')}
            style={local.logo}
            resizeMode="contain"
          />
          <Text style={[local.title, { color: colors.primaryText }]}>
            Starta din resa mot en holistisk hälsa nu
          </Text>
        </View>

        <View style={local.bottomArea}>
          <TouchableOpacity
            style={[local.button, { backgroundColor: colors.primaryText }]}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={local.buttonText}>Starta</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={[local.loginText, { color: colors.primaryText }]}>
              Har du redan ett konto? Logga in
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const local = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    zIndex: 1,
  },
  topArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Lato',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  bottomArea: {
    alignItems: 'center',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '600',
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Lato',
    textAlign: 'center',
  },
});

const stylesWeb = StyleSheet.create({
  webVideo: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    objectFit: 'cover',
    zIndex: -1,
  },
});
