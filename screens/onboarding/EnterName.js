import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');

const EnterName = ({ navigation }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim().length === 0) {
      alert('Please enter your name');
      return;
    }

    // You can store name in AsyncStorage, Context, or Redux here
    console.log('Name submitted:', name);
    navigation.navigate('SetPassword', { name: name.trim() }); // Pass name as parameter
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/name-page.jpg')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Enter Your name</Text>
      <Text style={styles.subtitle}>Enter your full name for your account.</Text>

      <View style={styles.inputWrapper}>
        <Image
          source={require('../../assets/profile.svg')} // Optional icon if you have
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#777',
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 40,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#999',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#7E66FF',
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
});

export default EnterName;
