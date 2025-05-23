// app/onboarding/index.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useGlobalStyles } from '@/globalStyles';
import useOnboarding from '@/hooks/useOnboarding';
import DotIndicator from './DotIndicator';
import NavigationArrows from './NavigationArrows';
import NameSlide from './slides/NameSlide';
import BirthyearSlide from './slides/BirthyearSlide';
import InterestsSlide from './slides/InterestsSlide';
import LanguageSlide from './slides/LanguageSlide';
import ThemeSlide from './slides/ThemeSlide';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [birthyear, setBirthyear] = useState('');
  const [interests, setInterests] = useState([]);
  const [lang, setLang] = useState(null);
  const [theme, setTheme] = useState(null);

  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const flatRef = useRef(null);
  const { styles: global, colors } = useGlobalStyles();
  const { validateStep, saveSettings } = useOnboarding();
  const router = useRouter();

  useEffect(() => {
    const checkOnboarding = async () => {
        const done = await AsyncStorage.getItem('onboardingDone');
        if (done === 'true') {
        router.replace('/calm');
        }
    };
    checkOnboarding();
}, []);


  const goToStep = (index) => {
    if (index >= 0 && index <= slides.length - 1) {
      flatRef.current?.scrollToOffset({ offset: index * width, animated: true });
      setStep(index);
    }
  };

  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleFinish = async () => {
    const isValid = validateStep({ name, birthyear, lang, theme });
    if (!isValid) return;

    // 🔁 Vänta in att allt sparas + UserContext uppdateras
    await saveSettings({ name, birthyear, interests, lang, theme });

    // 🎬 Navigera när allt är klart
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.replace('/calm');
    });
  };

  const slides = [
    <NameSlide key="name" name={name} setName={setName} colors={colors} />,
    <BirthyearSlide key="birth" birthyear={birthyear} setBirthyear={setBirthyear} colors={colors} />,
    <InterestsSlide key="interests" interests={interests} toggleInterest={toggleInterest} colors={colors} />,
    <LanguageSlide key="lang" lang={lang} setLang={setLang} colors={colors} />,
    <ThemeSlide key="theme" theme={theme} setTheme={setTheme} colors={colors} />,
  ];

  return (
    <Animated.View
      style={[
        local.container,
        {
          backgroundColor: colors.background,
          opacity,
          transform: [{ scale }],
        },
      ]}
    >
      <DotIndicator total={slides.length} current={step} activeColor={colors.primaryText} />

      <FlatList
        ref={flatRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        data={slides}
        renderItem={({ item }) => item}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
      />

      <NavigationArrows
        onBack={() => goToStep(step - 1)}
        onNext={() => goToStep(step + 1)}
        showBack={step > 0}
        showNext={step < slides.length - 1}
        color={colors.primaryText}
      />

      {step === slides.length - 1 && (
        <View style={local.buttonWrapper}>
          <TouchableOpacity
            style={[local.button, { backgroundColor: colors.primaryText }]}
            onPress={handleFinish}
          >
            <Text style={local.buttonText}>
              Du är redo! Klicka för att börja investera i din holistiska hälsa!
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
}

const local = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '600',
    textAlign: 'center',
  },
});
