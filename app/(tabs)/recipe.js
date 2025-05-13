import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getRecipes } from '@/services/firebase';
import RecipeCard from '@/components/RecipeCard';
import { useTranslation } from 'react-i18next';
import { useGlobalStyles } from '@/globalStyles'; // ⬅️ ny import

console.log('📖 Rendering RecipeScreen');

export default function RecipeScreen() {
  const [recipes, setRecipes] = useState([]);
  const { t } = useTranslation();
  const { styles, colors } = useGlobalStyles(); // ⬅️ hämta färger och stilar

  useEffect(() => {
    getRecipes().then(setRecipes);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        contentContainerStyle={{
          padding: 24,
          paddingBottom: 64,
        }}
        data={recipes}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Text style={[styles.header, { marginBottom: 16 }]}>
            {t('dinner', 'Middag')}
          </Text>
        }
        renderItem={({ item }) => (
          <RecipeCard
            id={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            thumbnail={item.thumbnail}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.text}>
            {t('no_recipes', 'Inga recept ännu.')}
          </Text>
        }
      />
    </View>
  );
}
