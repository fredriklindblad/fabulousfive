import { useFonts } from 'expo-font';
import { ActivityIndicator, View, Image, Pressable, Text } from 'react-native';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Tabs, useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useGlobalStyles } from '@/globalStyles';
import { useUser } from '@/contexts/UserContext';
import { LinearGradient } from 'expo-linear-gradient';
import '@/services/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import HeaderAvatar from '@/components/profile/HeaderAvatar';


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
              borderTopWidth: 1,
              borderTopColor: '#ccc',
              height: 60,
            },
            headerStyle: {
              backgroundColor: colors.background,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            },
            headerTitle: '',
            headerLeft: () => (
              <Pressable
                onPress={() => router.push('/philosophy')}
                style={{ marginLeft: 16, marginTop: -20, alignItems: 'center' }}
              >
                <Image
                  source={require('../../assets/icon-ff.png')}
                  style={{ width: 50, height: 50 }}
                  resizeMode="contain"
                />
              </Pressable>
            ),
            headerRight: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 12,
                    fontFamily: 'Lato',
                    color: colors.primaryText,
                    maxWidth: 100,
                    marginTop: 25,
                    marginRight: 8,
                    textAlign: 'right',
                  }}
                >
                  {user?.name ?? ''}
                </Text>
                <HeaderAvatar />
              </View>
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
              tabBarItemStyle: { marginRight: 28 },
            }}
          />
          <Tabs.Screen
            name="move"
            options={{
              title: t('move', 'Rörelse'),
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="body-outline" size={size} color={color} />
              ),
              tabBarItemStyle: { marginLeft: 28 },
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
          <Tabs.Screen name="profile" options={{ href: null }} />
          <Tabs.Screen name="philosophy" options={{ href: null }} />
          <Tabs.Screen name="ai" options={{ href: null }} />
        </Tabs>


        {/* F5 AI-knapp med gradient border */}
        <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center', zIndex: 100 }}>
          <LinearGradient
            colors={['#4285F4', '#A142F4', '#EA4335']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              padding: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Pressable
              onPress={() => router.push('/ai')}
              style={{
                width: 68,
                height: 68,
                borderRadius: 34,
                backgroundColor: colors.background,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 10,
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 12,
                    backgroundColor: 'transparent',
                    color: '#A142F4',
                  }}
                >
                  F5 AI
                </Text>
                <Ionicons name="sparkles-outline" size={22} color="#A142F4" style={{ marginTop: 6 }} />
              </View>
            </Pressable>
          </LinearGradient>
        </View>
      </LanguageProvider>
    </ThemeProvider>
  );
}
