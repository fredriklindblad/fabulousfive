import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useGlobalStyles } from '@/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null);
  const [checkedSteps, setCheckedSteps] = useState([]);
  const router = useRouter();
  const { styles, colors } = useGlobalStyles();
  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      const ref = doc(db, 'recipes', id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setRecipe({ id: snap.id, ...snap.data() });
        setCheckedSteps(new Array(snap.data().description?.length || 0).fill(false));
      }
    };
    fetchRecipe();
  }, [id]);

  const toggleStep = (index) => {
    const updated = [...checkedSteps];
    updated[index] = !updated[index];
    setCheckedSteps(updated);
  };

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
          backgroundColor: colors.cardBackground,
          padding: 8,
          borderRadius: 30,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
        }}
      >
        <Ionicons name="arrow-back" size={24} color={colors.primaryText} />
      </Pressable>

      <ScrollView contentContainerStyle={[local.container, { backgroundColor: colors.background }]}>
        {recipe.image && (
          <Image
            source={{ uri: recipe.image }}
            style={{ width: '100%', height: 220, borderRadius: 12, marginBottom: 20 }}
          />
        )}

        <Text style={[styles.header, { fontFamily: 'LatoBold', textAlign: 'center', marginBottom: 8 }]}>
          {recipe.title}
        </Text>


        {recipe.why && (
          <Text
            style={{
              fontFamily: 'LatoItalic',
              color: colors.secondaryText,
              textAlign: 'center',
              marginBottom: 20,
              fontSize: 16,
            }}
          >
            {recipe.why}
          </Text>
        )}

        {/* Info-kort */}
        {(recipe.time || recipe.servings) && (
          <View style={{ alignItems: 'center', marginBottom: 28 }}>
            <View style={{
              backgroundColor: colors.cardBackground,
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 24,
              padding: 12,
              borderRadius: 16,
              width: 280,
            }}>
              {recipe.time && (
                <View style={local.infoItem}>
                  <Ionicons name="time-outline" size={18} color={colors.primaryText} />
                  <Text style={local.infoText}>{recipe.time}</Text>
                </View>
              )}
              {recipe.servings && (
                <View style={local.infoItem}>
                  <Ionicons name="people-outline" size={18} color={colors.primaryText} />
                  <Text style={local.infoText}>{recipe.servings} portioner</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* INGREDIENSER först */}
        {recipe.ingredients && (
          <>
            <Text style={[styles.cardTitle, {
              marginTop: 0,
              marginBottom: 12,
              fontFamily: 'LatoBold',
            }]}>
              Ingredienser
            </Text>
            {recipe.ingredients.map((item, index) => (
              <Text key={index} style={local.ingredientText}>{item}</Text>
            ))}
          </>
        )}

        {/* STEG FÖR STEG sen */}
        {recipe.description && (
          <>
            <Text style={[styles.cardTitle, {
              marginTop: 24,
              marginBottom: 12,
              fontFamily: 'LatoBold',
            }]}>
              Steg för steg
            </Text>
            {recipe.description.map((step, index) => (
              <View key={index} style={local.stepRow}>
                <Checkbox
                  value={checkedSteps[index]}
                  onValueChange={() => toggleStep(index)}
                  color={checkedSteps[index] ? colors.primaryText : undefined}
                />
                <Text
                  style={[
                    local.stepText,
                    {
                      color: checkedSteps[index] ? colors.secondaryText : colors.primaryText,
                      textDecorationLine: checkedSteps[index] ? 'line-through' : 'none',
                    },
                  ]}
                >
                  {step}
                </Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
      {/* Tips-knapp fast i nedre vänster hörn */}
      {recipe.tips && (
        <>
          <Pressable
            onPress={() => setShowTips(true)}
            style={{
              position: 'absolute',
              bottom: 32,
              right: 20,
              backgroundColor: colors.cardBackground,
              borderRadius: 20,
              paddingVertical: 10,
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
            }}
          >
            <Ionicons name="bulb-outline" size={18} color={colors.primaryText} />
            <Text style={{ color: colors.primaryText, fontFamily: 'Lato', marginLeft: 8 }}>Tips</Text>
          </Pressable>

          {/* Popup med tips */}
          {showTips && (
            <View style={{
              position: 'absolute',
              bottom: 100,
              left: 20,
              right: 20,
              backgroundColor: colors.cardBackground,
              padding: 16,
              borderRadius: 16,
              shadowColor: '#000',
              shadowOpacity: 0.25,
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 6,
            }}>
              <Text style={[styles.cardTitle, { marginBottom: 8 }]}>Tips</Text>
              <Text style={[styles.cardText, { marginBottom: 12 }]}>{recipe.tips}</Text>
              <Pressable onPress={() => setShowTips(false)}>
                <Text style={[styles.buttonText, { color: colors.primaryText, textAlign: 'right' }]}>Stäng</Text>
              </Pressable>
            </View>
          )}
        </>
      )}

    </View>
  );
}

const local = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 100,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  stepText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Lato',
    flex: 1,
    lineHeight: 24,
  },
  ingredientText: {
    fontSize: 16,
    fontFamily: 'Lato',
    marginBottom: 12,
    marginLeft: 8,
    color: '#555',
    lineHeight: 24,
  },
  infoCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    padding: 12,
    borderRadius: 16,
    marginBottom: 28,
    marginHorizontal: 24, // 👈 Ger luft till vänster och höger
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontFamily: 'Lato',
    fontSize: 14,
  },
});
