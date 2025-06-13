import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function SetPassword({ route, setIsOnboarded }) {
  const { name, phone } = route.params;
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const requirements = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password),
  };

  const isValidPassword = Object.values(requirements).every(Boolean);

  const saveData = async () => {
    if (!isValidPassword) {
      setShowError(true);
      return;
    }

    const userData = { name, phone, password };
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    setIsOnboarded(true); // Redirects using onboarding state
  };

  const getIndicator = (passed) => ({
    color: passed ? '#7E66FF' : '#aaa',
    symbol: passed ? '●' : '○',
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/password-page.jpg')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Set a Strong Password</Text>
      <Text style={styles.subtitle}>Set a strong password for your account.</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setShowError(false);
          }}
          placeholder="********"
          placeholderTextColor="#aaa"
        />
      </View>

      {showError && (
        <Text style={styles.error}>Password does not meet requirements.</Text>
      )}

      <View style={styles.requirements}>
        {Object.entries({
          length: 'Should contain at least 8 characters',
          lowercase: 'Should contain a lowercase (small) letter (a - z)',
          uppercase: 'Should contain a uppercase (capital) letter (A - Z)',
          number: 'Should contain at least one number (0-9)',
          symbol: 'Should contain at least one symbol ($,@,#,%,!,*,?,&)',
        }).map(([key, label], index) => {
          const { color, symbol } = getIndicator(requirements[key]);
          return (
            <Text key={index} style={[styles.rule, { color }]}>
              {symbol} {label}
            </Text>
          );
        })}
      </View>

      <TouchableOpacity style={styles.button} onPress={saveData}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  image: {
    width: width * 0.6,
    height: 180,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
  error: {
    color: '#FF4444',
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  requirements: {
    marginTop: 16,
    marginBottom: 30,
  },
  rule: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#7E66FF',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
