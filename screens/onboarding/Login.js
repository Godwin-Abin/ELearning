import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Login = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');

  const handleJoinNow = () => {
    if (phone.length >= 10) {
      navigation.navigate('OTPVerify', { phone });
    } else {
      alert('Please enter a valid phone number');
    }
  };

  return (
    <View style={styles.container}>
      {/* Illustration */}
      <Image
        source={require('../../assets/login-page.jpg')}
        style={styles.illustration}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>Login to your account</Text>
      <Text style={styles.subtitle}>Login with your phone number</Text>

      {/* Phone Input Container */}
      <View style={styles.inputContainer}>
        <Image source={require('../../assets/flag.png')} style={styles.flagIcon} />
        <Text style={styles.countryCode}>+91</Text>
        <Image source={require('../../assets/phone.svg')} style={[styles.phoneIcon, { tintColor: '#000' }]} />
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="numeric"
          value={phone}
          onChangeText={(text) => {
            // Only allow digits and limit to 10 numbers
            const numericValue = text.replace(/[^0-9]/g, '');
            if (numericValue.length <= 10) {
              setPhone(numericValue);
            }
          }}
          maxLength={10}
        />
      </View>

      {/* Join Button */}
      <TouchableOpacity style={styles.button} onPress={handleJoinNow}>
        <Text style={styles.buttonText}>Join Now</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footer}>
        don't have a account?{' '}
        <Text style={styles.link} onPress={() => alert('Navigate to Signup')}>
          Create an Account
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 100,
    backgroundColor: '#fff',
  },
  illustration: {
    width: width * 0.6,
    height: 250,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 35,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000',
    paddingBottom: 20,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    height: 56,
  },
  flagIcon: {
    width: 98,
    height: 90,
    resizeMode: 'contain',
    marginLeft: -28,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '500',
  },
  phoneIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#7E66FF',
    marginTop: 30,
    borderRadius: 10,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
    marginTop: 20,
  },
  link: {
    color: '#6C63FF',
    fontWeight: 'bold',
  },
});

export default Login;
