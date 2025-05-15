// ✅ onboarding.js med slides ovanpå calm-skärmen
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useGlobalStyles } from '@/globalStyles';
import { useLanguageContext } from '@/LanguageContext';
import { useThemeContext } from '@/ThemeContext';
import { saveItem } from '@/services/storage';
import { saveUserProfile } from '@/services/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useToast } from '@/components/Toast';




const { width } = Dimensions.get('window');

const INTERESTS = ['Träning', 'Kost', 'Stillhet', 'Sömn', 'Socialt'];
const YEARS = Array.from({ length: 2025 - 1900 + 1 }, (_, i) => (1900 + i).toString());

export default function OnboardingOverlay() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [birthyear, setBirthyear] = useState('');
  const [interests, setInterests] = useState([]);
  const [lang, setLang] = useState(null);
  const [themeChosen, setThemeChosen] = useState(false);
  const [theme, setThemeState] = useState(null);
  const flatRef = useRef(null);
  const currentIndex = useRef(0);

  const { styles: global, colors } = useGlobalStyles();
  const { setTheme } = useThemeContext();
  const { changeLanguage } = useLanguageContext();
  const router = useRouter();
  const { showToast } = useToast();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (!user) {
        router.replace('/start/welcome');
        return;
      }

      const onboardingDone = await AsyncStorage.getItem('onboardingDone');
      if (onboardingDone === 'true') {
        router.replace('/(tabs)/calm');
      }
      // annars stannar man kvar på onboarding
    });

    return unsubscribe;
  }, []);


  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const saveSettings = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user || !name || !birthyear || !lang || !theme) {
    showToast('Fyll i alla steg innan du fortsätter');
    return;
  }

  await saveItem('onboardingDone', 'true');
  await saveItem('name', name);
  await saveItem('interests', JSON.stringify(interests));
  await saveItem('theme', theme);
  await saveItem('lang', lang);
  await saveItem('birthyear', birthyear);
  await changeLanguage(lang);
  await setTheme(theme);

  await saveUserProfile({
    name,
    lang,
    theme,
    birthyear,
    interests,
  });

  router.replace('/(tabs)/calm');
};


  const goToNextSlide = () => {
    const next = currentIndex.current + 1;
    flatRef.current?.scrollToOffset({ offset: next * width, animated: true });
    setStep(next);
    currentIndex.current = next;
  };

  const slides = [
    <View style={local.slide} key="name">
      <Text style={local.title}>Vad heter du?</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Ditt namn"
        placeholderTextColor="#888"
        style={[local.input, { color: colors.primaryText }]}
      />
    </View>,

    <View style={local.slide} key="year">
      <Text style={local.title}>Vilket år är du född?</Text>
      <View style={local.pickerWrapperStyled}>
        <Picker
          selectedValue={birthyear}
          onValueChange={(itemValue) => {
            setBirthyear(itemValue);
            goToNextSlide();
          }}
          style={local.pickerStyled}
          itemStyle={{
            fontSize: 22,
            fontFamily: 'LatoBold',
            color: colors.primaryText,
          }}
        >
          {YEARS.reverse().map((year) => (
            <Picker.Item label={year} value={year} key={year} />
          ))}
        </Picker>
      </View>
    </View>,

    <View style={local.slide} key="interests">
      <Text style={local.title}>Vad vill du fokusera på?</Text>
      <View style={local.grid}>
        {INTERESTS.map((interest) => (
          <TouchableOpacity
            key={interest}
            onPress={() => toggleInterest(interest)}
            style={[
              local.tag,
              interests.includes(interest) && { backgroundColor: colors.cardBackground },
            ]}
          >
            <Text
              style={[
                local.tagText,
                interests.includes(interest) && { color: colors.primaryText },
              ]}
            >
              {interest}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>,

    <View style={local.slide} key="lang">
      <Text style={local.title}>Välj språk</Text>
      <View style={local.themeRow}>
        <TouchableOpacity
          onPress={() => {
            setLang('sv');
            goToNextSlide();
          }}
          style={[
            local.themeOption,
            lang === 'sv' && { backgroundColor: colors.cardBackground, borderColor: colors.primaryText },
          ]}
        >
          <Text style={{ fontSize: 48 }}>🇸🇪</Text>
          <Text style={[local.themeText, { color: colors.primaryText }]}>Svenska</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setLang('en');
            goToNextSlide();
          }}
          style={[
            local.themeOption,
            lang === 'en' && { backgroundColor: colors.cardBackground, borderColor: colors.primaryText },
          ]}
        >
          <Text style={{ fontSize: 48 }}>🇺🇸</Text>
          <Text style={[local.themeText, { color: colors.primaryText }]}>English</Text>
        </TouchableOpacity>
      </View>
    </View>,

    <View style={local.slide} key="theme">
      <Text style={local.title}>Välj tema</Text>
      <View style={local.themeRow}>
        <TouchableOpacity
          onPress={() => {
            setThemeState('light');
            setThemeChosen(true);
          }}
          style={[
            local.themeOption,
            theme === 'light' && { backgroundColor: colors.cardBackground, borderColor: colors.primaryText },
          ]}
        >
          <Ionicons name="sunny-outline" size={48} color={colors.primaryText} />
          <Text style={[local.themeText, { color: colors.primaryText }]}>Ljust</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setThemeState('dark');
            setThemeChosen(true);
          }}
          style={[
            local.themeOption,
            theme === 'dark' && { backgroundColor: colors.cardBackground, borderColor: colors.primaryText },
          ]}
        >
          <Ionicons name="moon-outline" size={48} color={colors.primaryText} />
          <Text style={[local.themeText, { color: colors.primaryText }]}>Mörkt</Text>
        </TouchableOpacity>
      </View>
    </View>,
  ];

  return (
    <View style={[local.overlay, { backgroundColor: colors.background }]}> 
      <FlatList
        ref={flatRef}
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        data={[0, 1, 2, 3, 4]}
        renderItem={({ item }) => slides[item]}
        keyExtractor={(_, index) => index.toString()}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setStep(index);
          currentIndex.current = index;
        }}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {step === slides.length - 1 && themeChosen && (
        <View style={local.buttonWrapper}>
          <TouchableOpacity
            style={[local.button, { backgroundColor: colors.primaryText }]}
            onPress={saveSettings}
          >
            <Text style={local.buttonText}>Börja investera i din holistiska hälsa!</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={local.navArrows}>
        {currentIndex.current > 0 && (
          <TouchableOpacity
            onPress={() => {
              const next = currentIndex.current + 1;
              console.log('➡️ Går till slide', next);
              flatRef.current?.scrollToOffset({
                offset: next * width,
                animated: true,
              });
            }}
            style={local.arrowButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.primaryText} />
          </TouchableOpacity>
        )}

        {currentIndex.current < slides.length - 1 && (
          <TouchableOpacity
            onPress={() => {
              flatRef.current?.scrollToOffset({
                offset: (currentIndex.current + 1) * width,
                animated: true,
              });
            }}
            style={local.arrowButton}
          >
            <Ionicons name="arrow-forward" size={24} color={colors.primaryText} />
          </TouchableOpacity>
        )}
      </View>

      <View style={local.dots}>
        {slides.map((_, index) => (
          <View key={index} style={[local.dot, step === index && { backgroundColor: colors.primaryText }]} />
        ))}
      </View>
    </View>
  );
}

const local = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 50,
    bottom: 50,
    left: 16,
    right: 16,
    zIndex: 1000,
    backgroundColor: '#fff', // eller colors.background
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  slide: {
    width: width * 0.9,
    padding: 24,
    marginHorizontal: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'LatoBold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Lato',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  tag: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 4,
  },
  tagText: {
    fontFamily: 'Lato',
    color: '#555',
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  langButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#eee',
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
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    margin: 6,
  },
    navArrows: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    marginTop: 10,
  },

  arrowButton: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
    pickerWrapper: {
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    width: '100%',
    marginBottom: 24,
    overflow: 'hidden',
  },
  picker: {
    height: 180,
    width: '100%',
  },
  themeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
    gap: 16,
  },
  themeOption: {
    width: 140,
    height: 140,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  themeText: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: 'LatoBold',
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  pickerWrapperStyled: {
    backgroundColor: '#f1f1f1',
    borderRadius: 16,
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  pickerStyled: {
    width: '100%',
    height: '100%',
  },

});
