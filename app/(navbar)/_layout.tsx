import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
        }}
      />
      <Tabs.Screen
        name="blank"
        options={{
          title: 'Boş Sayfa',
        }}
      />
      <Tabs.Screen
        name="deneme"
        options={{
          title: 'Deneme',
        }}
      />
    </Tabs>
  );
}
