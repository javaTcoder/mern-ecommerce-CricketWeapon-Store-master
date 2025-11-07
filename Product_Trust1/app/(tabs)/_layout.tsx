import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
          
          switch (route.name) {
            case 'home':
              iconName = 'home-outline';
              break;
            case 'categories':
              iconName = 'grid-outline';
              break;
            case 'account':
              iconName = 'person-outline';
              break;
            case 'cart':
              iconName = 'cart-outline';
              break;
            default:
              iconName = 'home-outline';
          }
          
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home'
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories'
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account'
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart'
        }}
      />
    </Tabs>
  );
}