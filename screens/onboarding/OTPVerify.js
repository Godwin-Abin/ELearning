import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function OTPVerify({ navigation, route }) {
  const { name, phone } = route.params;
  const [otp, setOtp] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text>Code sent to: {phone}</Text>
      <TextInput
        maxLength={4}
        keyboardType="number-pad"
        style={styles.input}
        value={otp}
        onChangeText={setOtp}
      />
      <Button
        title="Verify"
        onPress={() => navigation.navigate('SetPassword', { name, phone })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, borderRadius: 8, marginTop: 10 },
});
