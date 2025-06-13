import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');

  const handleLogin = () => {
    // Here you should validate phone and send OTP
    navigation.navigate('OTPVerify', { phone });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        placeholder="+91"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Join Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 18 },
  input: { borderWidth: 1, padding: 10, marginTop: 10 },
  button: { backgroundColor: '#6C63FF', padding: 15, marginTop: 20 },
  buttonText: { color: '#fff', textAlign: 'center' },
});

export default Login;
