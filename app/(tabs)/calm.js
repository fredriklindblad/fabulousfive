import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  FlatList,
  View,
  Dimensions,
} from 'react-native';
import { useGlobalStyles } from '@/globalStyles';
import PhilosophyBox from '@/components/PhilosophyBox';
import MeditationCard from '@/components/MeditationCard';
import { getMeditations } from '@/services/firebase';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.7;

export default function CalmScreen() {
  const { styles: global, colors } = useGlobalStyles();
  const [meditations, setMeditations] = useState([]);

  useEffect(() => {
    getMeditations().then((data) => {
      setMeditations(data);
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <PhilosophyBox
        title="Vår filosofi"
        text="Vi tror på stillhet som ett sätt att återknyta till oss själva. Genom meditation, reflektion och närvaro kan vi skapa balans och lugn i vardagen."
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[local.container, { minHeight: Dimensions.get('window').height }]}
      >
        {/* 🧘 Meditationer */}
        <Text style={[local.title, { color: colors.primaryText }]}>Meditationer</Text>

        <View style={{ height: 220 }}>
          <FlatList
            horizontal
            data={meditations}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 12, paddingRight: 24 }}
            renderItem={({ item }) => (
              <View style={{ marginRight: 16, width: cardWidth }}>
                <MeditationCard
                  id={item.id}
                  title={item.title}
                  description={item.shortdescription}
                  thumbnail={item.thumbnail}
                />
              </View>
            )}
            style={{ flex: 1 }}
          />
        </View>

        {/* Ger extra scrollutrymme */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const local = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
  },
  philosophyWrapper: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Lato',
    marginBottom: 16,
  },
});


