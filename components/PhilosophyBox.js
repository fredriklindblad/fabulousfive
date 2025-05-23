import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGlobalStyles } from '@/globalStyles';

export default function PhilosophyPopup({ title = 'Vår filosofi', text }) {
  const [visible, setVisible] = useState(false);
  const { styles, colors } = useGlobalStyles();

  return (
    <>
      {/* Knapp nere till höger */}
      <Pressable
        onPress={() => setVisible(true)}
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
          justifyContent: 'space-between',
          padding: 12,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          zIndex: 10,
        }}
      >
        <Ionicons name="information-circle-outline" size={18} color={colors.primaryText} />
          <Text
            style={{
              color: colors.primaryText,
              fontFamily: 'Lato',
              marginLeft: 8,
              fontSize: 16,
              flexShrink: 1,
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
      </Pressable>

      {/* Popup-rutan */}
      {visible && (
        <View
          style={{
            position: 'absolute',
            top: 100,
            left: 20,
            right: 20,
            height: '50%',
            backgroundColor: colors.cardBackground,
            borderRadius: 16,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 6,
            zIndex: 10,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              padding: 16,
              paddingBottom: 24,
            }}
            showsVerticalScrollIndicator={true}
          >
            <Text style={[styles.cardTitle, { marginBottom: 8 }]}>{title}</Text>
            <Text style={[styles.cardText, { marginBottom: 12 }]}>{text}</Text>

            <Pressable onPress={() => setVisible(false)}>
              <Text
                style={[
                  styles.buttonText,
                  { color: colors.primaryText, textAlign: 'right' },
                ]}
              >
                Stäng
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      )}
    </>
  );
}
