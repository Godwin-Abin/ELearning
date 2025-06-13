import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabNavigator from './navigation/TabNavigator';
import OnboardingStack from './screens/onboarding/OnboardingStack';

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const data = await AsyncStorage.getItem('userData');
      if (data) setIsOnboarded(true);
    };
    checkUser();
  }, []);

  return (
    <NavigationContainer>
      {isOnboarded ? <TabNavigator /> : <OnboardingStack setIsOnboarded={setIsOnboarded} />}
    </NavigationContainer>
  );
}
