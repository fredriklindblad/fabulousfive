import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { getRecipes, auth } from '@/services/firebase';
import RecipeCard from '@/components/RecipeCard';
import { useTranslation } from 'react-i18next';
import { useGlobalStyles } from '@/globalStyles';
import PhilosophyBox from '@/components/PhilosophyBox';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.7;

export default function RecipeScreen() {
  const [groupedRecipes, setGroupedRecipes] = useState({});
  const { t } = useTranslation();
  const { styles, colors } = useGlobalStyles();
  const [user, setUser] = useState(null);

  const categories = ['frukost', 'lunch', 'middag', 'snacks'];

  useEffect(() => {
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
        <Text style={[local.title, { color: colors.primaryText }]}>
          {t(categoryKey, categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1))}
        </Text>
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 12, paddingRight: 24 }}
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
          style={{ flex: 1 }}
        />
      </View>
    );
  };

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
        {user ? (
          <>
            <Text style={[local.title, { color: colors.primaryText }]}>Recept</Text>
            {categories.map((item) => renderCategory(item))}
            <View style={{ height: 100 }} />
          </>
        ) : (
          <View style={{ padding: 24 }}>
            <Text style={styles.text}>Du behöver vara inloggad för att se recepten.</Text>
          </View>
        )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Lato',
    marginBottom: 16,
  },
});
