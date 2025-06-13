import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SetPassword({ route, setIsOnboarded }) {
  const { name, phone } = route.params;
  const [password, setPassword] = useState('');

  const saveData = async () => {
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters.');
      return;
    }

    const userData = { name, phone, password };
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    setIsOnboarded(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Password</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Submit" onPress={saveData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 20 },
});
