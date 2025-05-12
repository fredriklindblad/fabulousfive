// Skärm för att visa recept
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getRecipes } from '@/services/firebase';
import RecipeCard from '@/components/RecipeCard';
import { useTranslation } from 'react-i18next';
import { GlobalStyles, GlobalColors } from '@/globalStyles';

console.log('📖 Rendering RecipeScreen');

export default function RecipeScreen() {
  const [recipes, setRecipes] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getRecipes().then(setRecipes);
  }, []);

  return (
    <View style={[GlobalStyles.container, { backgroundColor: GlobalColors.background }]}>
      <Text style={GlobalStyles.header}>{t('recipes', 'Recept')}</Text>
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
        ListEmptyComponent={
          <Text style={GlobalStyles.text}>
            {t('no_recipes', 'Inga recept ännu.')}
          </Text>
        }
      />
    </View>
  );
}
