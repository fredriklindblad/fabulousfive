import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import { getRecipes } from '@/services/firebase';
import RecipeCard from '@/components/RecipeCard';
import { useTranslation } from 'react-i18next';
import { useGlobalStyles } from '@/globalStyles';
import { getAuth } from 'firebase/auth';
import PhilosophyCard from '@/components/PhilosophyCard';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.7;

export default function RecipeScreen() {
  const [groupedRecipes, setGroupedRecipes] = useState({});
  const { t } = useTranslation();
  const { styles, colors } = useGlobalStyles();
  const [user, setUser] = useState(null);

  const categories = ['frukost', 'lunch', 'middag', 'snacks'];

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log('⛔️ Inte inloggad – recept laddas inte');
      return;
    }

    setUser(currentUser);

    getRecipes().then((allRecipes) => {
      const groups = {
        frukost: [],
        lunch: [],
        middag: [],
        snacks: [],
      };

      allRecipes.forEach((r) => {
        const catList = Array.isArray(r.category) ? r.category : [r.category];
        catList.forEach((cat) => {
          const key = typeof cat === 'string' ? cat.toLowerCase() : '';
          if (groups[key]) {
            groups[key].push(r);
          }
        });
      });

      setGroupedRecipes(groups);
    });
  }, []);

  const renderCategory = (categoryKey) => {
    const data = groupedRecipes[categoryKey];
    if (!data || data.length === 0) return null;

    return (
      <View key={categoryKey} style={{ marginBottom: 32 }}>
        <Text style={[styles.header, {
          marginLeft: 24,
          marginBottom: 12,
          marginTop: 10,
          textAlign: 'left',
        }]}>
          {t(categoryKey, categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1))}
        </Text>
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 24 }}
          renderItem={({ item }) => (
            <View style={{ marginRight: 16, width: cardWidth }}>
              <RecipeCard
                id={item.id}
                title={item.title}
                description={item.shortdescription}
                image={item.image}
                thumbnail={item.thumbnail}
              />
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* 📖 PhilosophyBox uppe till höger */}
      <View style={local.philosophyWrapper}>
        <PhilosophyCard
          title="Vår filosofi"
          text="Näring för kropp och själ är grunden till ett liv i balans."
          image="https://source.unsplash.com/300x300/?healthy-food"
          variant="topRight"
          modalContent="Vi ser mat som mer än energi – det är ett verktyg för läkning, glädje och närvaro. Medvetna val vid varje måltid skapar långsiktig hälsa."
        />
      </View>

      {user ? (
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          contentContainerStyle={{
            paddingTop: screenWidth * 0.5 + 40, // utrymme under boxen
            paddingBottom: 64,
          }}
          renderItem={({ item }) => renderCategory(item)}
        />
      ) : (
        <View style={{ padding: 24 }}>
          <Text style={styles.text}>Du behöver vara inloggad för att se recepten.</Text>
        </View>
      )}
    </View>
  );
}

const local = StyleSheet.create({
  philosophyWrapper: {
    position: 'absolute',
    top: 24,
    right: 24,
    width: Dimensions.get('window').width * 0.5,
    aspectRatio: 1,
    zIndex: 1,
  },
});
