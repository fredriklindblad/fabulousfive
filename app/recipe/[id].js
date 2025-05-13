import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useGlobalStyles } from '@/globalStyles'; // ⬅️ ny hook
import { Ionicons } from '@expo/vector-icons';

export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null);
  const router = useRouter();
  const { styles, colors } = useGlobalStyles(); // ⬅️ hämta dark/light-stilar

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
      <View style={styles.container}>
        <Text style={styles.text}>Laddar recept...</Text>
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
          backgroundColor: 'rgba(255,255,255,0.8)', // 👈 Vill du ha detta mörkare i dark mode?
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

      <ScrollView style={styles.container}>
        {recipe.image && (
          <Image
            source={{ uri: recipe.image }}
            style={{ width: '100%', height: 220, borderRadius: 12, marginBottom: 20 }}
          />
        )}
        <Text style={styles.header}>{recipe.title}</Text>
        <Text style={styles.text}>{recipe.description}</Text>

        {recipe.ingredients && (
          <>
            <Text style={[styles.cardTitle, { marginTop: 20 }]}>Ingredienser:</Text>
            {recipe.ingredients.map((item, index) => (
              <Text key={index} style={styles.cardText}>• {item}</Text>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}
