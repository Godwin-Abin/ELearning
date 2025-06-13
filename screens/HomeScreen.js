import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [name, setName] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('userData').then(data => {
      if (data) {
        const parsed = JSON.parse(data);
        setName(parsed.name);
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome, {name}!</Text>
    </View>
  );
}
