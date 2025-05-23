import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert, Dimensions, Pressable, Animated, PanResponder } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { useGlobalStyles } from '@/globalStyles';
import { useTranslation } from 'react-i18next';
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useUser } from '@/contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';

import ProfileHeader from '@/components/profile/ProfileHeader';
import SettingsPanel from '@/components/profile/SettingsPanel';

export const unstable_settings = {
  headerShown: true,
  headerTitleAlign: 'center',
};

export default function ProfileScreen() {
  const { styles, colors } = useGlobalStyles();
  const { t } = useTranslation();
  const { theme, setTheme } = useThemeContext();
  const { changeLanguage, language } = useLanguageContext();
  const user = useUser();
  const router = useRouter();
  const navigation = useNavigation();

  const [settingsVisible, setSettingsVisible] = useState(false);
  const settingsAnim = useState(new Animated.Value(Dimensions.get('window').width))[0];

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dx > 10,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dx > 30) toggleSettings();
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{
          fontFamily: 'LatoBold',
          fontSize: 18,
          color: colors.primaryText,
          textAlign: 'center',
          width: '100%',
        }}>
          {user?.name ? `Hej ${user.name}!` : ''}
        </Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {user?.email === 'fredrik-lindblad@hotmail.com' && (
            <Pressable onPress={() => router.push('/admin/')} style={{ marginRight: 16 }}>
              <Ionicons name="shield-checkmark-outline" size={24} color={colors.primaryText} />
            </Pressable>
          )}
          <Pressable onPress={toggleSettings} style={{ marginRight: 12 }}>
            <Ionicons name="settings-outline" size={24} color={colors.primaryText} />
          </Pressable>
        </View>
      ),
    });
  }, [user]);

  const toggleSettings = () => {
    if (settingsVisible) {
      Animated.timing(settingsAnim, {
        toValue: Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setSettingsVisible(false));
    } else {
      setSettingsVisible(true);
      Animated.timing(settingsAnim, {
        toValue: Dimensions.get('window').width / 2,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ flexGrow: 1, padding: 24 }}
      >
        <ProfileHeader
          name={user?.name}
          interests={user?.interests}
          ffPoints={99}
          profileImage={user?.image}
          onEdit={() => router.push('/profile/edit')}
        />
      </ScrollView>

      <SettingsPanel
        visible={settingsVisible}
        toggle={toggleSettings}
        animationValue={settingsAnim}
        panHandlers={panResponder.panHandlers}
        theme={theme}
        language={language}
        setTheme={setTheme}
        changeLanguage={changeLanguage}
        onLogout={() => router.replace('/(auth)/login')}
      />
    </View>
  );
}
