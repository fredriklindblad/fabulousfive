import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, Pressable, Linking, FlatList, View, Dimensions } from 'react-native';
import { useGlobalStyles } from '@/globalStyles';
import PhilosophyCard from '@/components/PhilosophyCard';
import MeditationCard from '@/components/MeditationCard';
import { getMeditations } from '@/services/firebase';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.7;

export default function CalmScreen() {
  const { styles: global, colors } = useGlobalStyles();
  const [meditations, setMeditations] = useState([]);

  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/fabulousfive.se');
  };

  useEffect(() => {
    getMeditations().then((data) => {
      setMeditations(data);
    });
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={local.container}
    >
      {/* 📖 PhilosophyBox */}
      <View style={local.philosophyWrapper}>
        <PhilosophyCard
          title="Vår filosofi"
          text="Livets visdom ligger i enkelhet. Investera i din kropp, rensa ditt sinne och återvänd till naturen. - inspirerat av Naval Ravikant & Paul Chek."
          image="https://source.unsplash.com/300x300/?zen"
          variant="topRight"
          modalContent="Vi tror på ett liv i harmoni med naturen, där fysisk rörelse, mental stillhet och medveten kost går hand i hand. Inspirerade av tänkare som Naval Ravikant och Paul Chek uppmuntrar vi till närvaro, självinvestering och ett inre lugn."
        />
      </View>

      {/* 🧘 Meditationer */}
      <Text style={[local.title, { color: colors.primaryText }]}>Meditationer</Text>
      <FlatList
        horizontal
        data={meditations}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 24, paddingBottom: 40 }}
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
      />
    </ScrollView>
  );
}

const local = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
  },
  philosophyWrapper: {
    position: 'absolute',
    top: 24,
    right: 24,
    width: Dimensions.get('window').width * 0.5,
    aspectRatio: 1,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Lato',
    marginBottom: 16,
    marginTop: Dimensions.get('window').width * 0.5 + 40,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '600',
  },
});
