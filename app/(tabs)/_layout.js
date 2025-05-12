import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import { GlobalColors } from '@/globalStyles';

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: GlobalColors.primaryText,
        tabBarInactiveTintColor: GlobalColors.secondaryText,
        tabBarStyle: {
          backgroundColor: GlobalColors.background,
          borderTopWidth: 0,
          height: 60,
        },
        headerStyle: {
          backgroundColor: GlobalColors.background,
        },
        headerTitleStyle: {
          fontFamily: 'Lato',
          fontSize: 20,
          color: GlobalColors.primaryText,
        },
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Image
            source={require('../../assets/icon-ff.png')}
            style={{ width: 110, height: 110, marginLeft: 16, marginBottom: 10 }}
            resizeMode="contain"
          />
        ),
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: t('feed', 'Flöde'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recipe"
        options={{
          title: t('recipes', 'Recept'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calm"
        options={{
          title: t('calm', 'Stillhet'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="leaf-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile', 'Profil'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
