import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          // Map route names to Ionicons names explicitly.
          const iconName =
            route.name === 'index' ? 'home' : route.name === 'explore' ? 'search' : 'cart';
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    />
  );
}