// Skärm för att visa recept
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getRecipes } from '@/services/firebase';
import RecipeCard from '@/components/RecipeCard';
import { useTranslation } from 'react-i18next';

console.log('Rendering RecipeScreen');

export default function RecipeScreen() {
  const [recipes, setRecipes] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getRecipes().then(setRecipes);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('recipes')}</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            title={item.title}
            description={item.description}
            image={item.image}
          />
        )}
        ListEmptyComponent={<Text>{t('no_recipes') || 'Inga recept ännu.'}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 }
});
