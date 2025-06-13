import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EnterName from './EnterName';
import Login from './Login';
import OTPVerify from './OTPVerify';
import SetPassword from './SetPassword';

const Stack = createStackNavigator();

export default function OnboardingStack({ setIsOnboarded }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OTPVerify" component={OTPVerify} />
      <Stack.Screen name="EnterName" component={EnterName} />
      <Stack.Screen name="SetPassword">
        {props => <SetPassword {...props} setIsOnboarded={setIsOnboarded} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
