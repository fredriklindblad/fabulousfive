import { useFonts } from 'expo-font';
import { ActivityIndicator, View, Image, Pressable, Text } from 'react-native';
import { ThemeProvider } from '@/ThemeContext';
import { LanguageProvider } from '@/LanguageContext';
import { Tabs, useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useGlobalStyles } from '@/globalStyles';
import { useUser } from '@/contexts/UserContext';
import '@/services/i18n';

export default function TabsLayout() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const { colors } = useGlobalStyles();
  const user = useUser();

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: colors.primaryText,
            tabBarInactiveTintColor: colors.secondaryText,
            tabBarLabelPosition: 'below-icon',
            tabBarStyle: {
              backgroundColor: colors.background,
              borderTopWidth: 0,
              height: 60,
              borderTopWidth: 1,
              borderTopColor: '#ccc',
            },
            headerStyle: {
              backgroundColor: colors.background,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            },
            // 🔧 Dynamisk titel i headern
            headerTitle: '',
            headerLeft: () => (
              <Pressable
                onPress={() => router.push('/philosophy')}
                style={{ marginLeft: 16, marginBottom: 20, alignItems: 'center' }} // <-- detta fixar det
              >
                <Image
                  source={require('../../assets/icon-ff.png')}
                  style={{ width: 50, height: 50 }} // du kan justera storlek här om du vill
                  resizeMode="contain"
                />
                <Text style={{ fontSize: 12, color: colors.primaryText, fontFamily: 'Lato' }}>
                  {t('philosophy', 'Filosofi')}
                </Text>
              </Pressable>
            ),
            headerRight: () => (
              <Pressable
                onPress={() => router.push('/profile')}
                style={{ paddingRight: 16 }}
              >
                <Ionicons name="person-circle-outline" size={28} color={colors.primaryText} />
                <Text style={{ fontSize: 12, color: colors.primaryText, fontFamily: 'Lato' }}>
                  {user?.name ?? t('profile', 'Profil')}
                </Text>
              </Pressable>
            ),
          }}
        >
          <Tabs.Screen
            name="calm"
            options={{
              title: t('peace', 'Stillhet'),
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="leaf-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="recipe"
            options={{
              title: t('nutrition', 'Näring'),
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="restaurant-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="move"
            options={{
              title: t('move', 'Rörelse'),
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="body-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="happiness"
            options={{
              title: t('happiness', 'Lycka'),
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="heart-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="philosophy"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="ai"
            options={{
              href: null,
            }}
          />
        </Tabs>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
            zIndex: 100,
          }}
        >
          <Pressable
            onPress={() => router.push('/ai')}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40, // 50% av storlek för perfekt rund
              backgroundColor: colors.cardBackground,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: colors.border,       // 🟢 grön kant
              borderWidth: 1.5,                 // tunn men synlig
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 10,                    // Android-skugga
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: colors.primaryText, fontWeight: 'bold', fontSize: 12 }}>
                F5 AI
              </Text>
              <Ionicons name="sparkles-outline" size={22} color={colors.primaryText} style={{ marginTop: 6 }} />
            </View>
          </Pressable>
        </View>
      </LanguageProvider>
    </ThemeProvider>
  );
}
