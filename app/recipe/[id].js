import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { GlobalStyles } from '@/globalStyles';
import { Ionicons } from '@expo/vector-icons';

export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null);
  const router = useRouter();

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
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={() => router.replace('/recipe')}
        style={{
          position: 'absolute',
          top: 40,
          right: 20,
          zIndex: 10,
          backgroundColor: 'rgba(255,255,255,0.8)',
          padding: 8,
          borderRadius: 30,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
        }}
      >
        <Ionicons name="arrow-back" size={24} color="#333" />
      </Pressable>

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
    </View>
  );
}
