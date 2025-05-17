import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getDoc, doc } from 'firebase/firestore';
import { Video } from 'expo-av';
import { db } from '@/services/firebase';
import { useGlobalStyles } from '@/globalStyles';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export default function MeditationDetail() {
  const { id } = useLocalSearchParams();
  const [meditation, setMeditation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false); // Web: visa direkt
  const { colors, styles: global } = useGlobalStyles();
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchMeditation = async () => {
      try {
        const ref = doc(db, 'meditations', id);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          setMeditation(snapshot.data());
        }
      } catch (error) {
        console.error('🔥 Fel vid hämtning:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeditation();
  }, [id]);

  const openFullscreen = async () => {
    if (Platform.OS === 'web') {
      // Visa spelare direkt på web
      setShowVideo(true);
    } else {
      try {
        await videoRef.current?.presentFullscreenPlayer();
      } catch (err) {
        console.warn('🎬 Kunde inte öppna fullscreen:', err);
      }
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  if (!meditation) {
    return (
      <View style={styles.centered}>
        <Text style={[global.text, { color: colors.primaryText }]}>Meditationen kunde inte hittas.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.title, { color: colors.primaryText }]}>
        {meditation.title}
      </Text>
      <Text style={[styles.description, { color: colors.secondaryText }]}>
        {meditation.why}
      </Text>

      {!showVideo && (
        <TouchableOpacity style={styles.thumbnailWrapper} onPress={openFullscreen}>
          {meditation.thumbnail ? (
            <Image source={{ uri: meditation.thumbnail }} style={styles.thumbnail} />
          ) : (
            <View style={[styles.thumbnail, { backgroundColor: '#ccc' }]} />
          )}
          <View style={styles.playButton}>
            <Ionicons name="play-circle" size={64} color="#fff" />
          </View>
        </TouchableOpacity>
      )}

      {showVideo && meditation.videoUrl && (
        <Video
          ref={videoRef}
          source={{ uri: meditation.videoUrl }}
          useNativeControls
          resizeMode="contain"
          style={styles.video}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'LatoBold',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Lato',
    lineHeight: 22,
    marginBottom: 24,
    textAlign: 'center',
  },
  thumbnailWrapper: {
    position: 'relative',
    width: screenWidth * 0.9,
    height: screenWidth * 0.56,
    marginBottom: 40,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -32,
    marginTop: -32,
  },
  video: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.56,
    borderRadius: 12,
    backgroundColor: '#000',
    marginBottom: 40,
  },
});
