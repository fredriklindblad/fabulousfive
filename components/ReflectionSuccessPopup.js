import React, { useEffect, useState } from 'react';
import { Animated, Text, StyleSheet, Dimensions, View } from 'react-native';
import { useGlobalStyles } from '@/globalStyles';

const quotes = [
  'Bra jobbat! Du tog dig tid för dig själv 💚',
  'Du stärker din mentala hälsa, en reflektion i taget ✨',
  'Att stanna upp är att gå framåt 🌱',
  'Du investerar i ditt välmående – heja dig 🙌',
  'Reflektion är en superkraft – och du har den! 🧠',
];

const { width } = Dimensions.get('window');

export default function ReflectionSuccessPopup({ visible, onFinish }) {
  const { colors } = useGlobalStyles();
  const [translateY] = useState(new Animated.Value(-200));
  const [quote, setQuote] = useState('');

  useEffect(() => {
    if (visible) {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);

      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.delay(3000),
        Animated.timing(translateY, {
          toValue: -200,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onFinish?.();
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.popup,
        {
          backgroundColor: colors.cardBackground,
          transform: [{ translateY }],
          borderColor: colors.primaryText,
        },
      ]}
    >
      <Text style={[styles.text, { color: colors.primaryText }]}>{quote}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    zIndex: 100,
  },
  text: {
    fontSize: 16,
    fontFamily: 'LatoBold',
    textAlign: 'center',
  },
});
