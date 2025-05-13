import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { getRecipes } from '@/services/firebase';
import RecipeCard from '@/components/RecipeCard';
import { useTranslation } from 'react-i18next';
import { useGlobalStyles } from '@/globalStyles';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.7;

export default function RecipeScreen() {
  const [groupedRecipes, setGroupedRecipes] = useState({});
  const { t } = useTranslation();
  const { styles, colors } = useGlobalStyles();

  const categories = ['frukost', 'lunch', 'middag', 'snacks'];

  useEffect(() => {
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
          textAlign: 'left', // 👈 detta läggs till
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
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingBottom: 64 }}
        renderItem={({ item }) => renderCategory(item)}
      />
    </View>
  );
}
