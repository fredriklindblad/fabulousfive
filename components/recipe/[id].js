import { View, Text, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { GlobalStyles } from '@/globalStyles';

export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const ref = doc(db, 'recipes', id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setRecipe({ id: snap.id, ...snap.data() });
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return (
      <View style={GlobalStyles.container}>
        <Text style={GlobalStyles.text}>Laddar recept...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={GlobalStyles.container}>
      {recipe.image && (
        <Image
          source={{ uri: recipe.image }}
          style={{ width: '100%', height: 220, borderRadius: 12, marginBottom: 20 }}
        />
      )}
      <Text style={GlobalStyles.header}>{recipe.title}</Text>
      <Text style={GlobalStyles.text}>{recipe.description}</Text>

      {recipe.ingredients && (
        <>
          <Text style={[GlobalStyles.cardTitle, { marginTop: 20 }]}>Ingredienser:</Text>
          {recipe.ingredients.map((item, index) => (
            <Text key={index} style={GlobalStyles.cardText}>• {item}</Text>
          ))}
        </>
      )}
    </ScrollView>
  );
}
