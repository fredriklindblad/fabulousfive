// navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../screens/FeedScreen';
import RecipeScreen from '../screens/RecipeScreen';
import GoalScreen from '../screens/GoalScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#DBBEC0',
        tabBarInactiveTintColor: '#F1DFDF',
        tabBarStyle: { backgroundColor: '#5D3E17' },
        headerStyle: { backgroundColor: '#5D3E17' },
        headerTitleStyle: { color: '#DBBEC0', fontFamily: 'Lato', fontSize: 20 },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Feed') {
            iconName = 'home-outline';
          } else if (route.name === 'Recipes') {
            iconName = 'restaurant-outline';
          } else if (route.name === 'Goals') {
            iconName = 'checkmark-done-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} options={{ title: t('feed') }} />
      <Tab.Screen name="Recipes" component={RecipeScreen} options={{ title: t('recipes') }} />
      <Tab.Screen name="Goals" component={GoalScreen} options={{ title: t('goals') }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: t('profile') }} />
    </Tab.Navigator>
  );
}
