import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useGlobalStyles } from '@/globalStyles';

export default function TabsLayout() {
  const { t } = useTranslation();
  const router = useRouter();
  const { colors } = useGlobalStyles();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primaryText,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          height: 60,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitle: '',
        headerLeft: () => (
          <Image
            source={require('../../assets/icon-ff.png')}
            style={{ width: 110, height: 110, marginLeft: 16, marginBottom: 10 }}
            resizeMode="contain"
          />
        ),
        headerRight: () => (
          <Pressable
            onPress={() => router.push('/(tabs)/profile')}
            style={{ paddingRight: 16 }}
          >
            <Ionicons name="person-circle-outline" size={28} color={colors.primaryText} />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="move"
        options={{
          title: t('move', 'Rörelse'),
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
