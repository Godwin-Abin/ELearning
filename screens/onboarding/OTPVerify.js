import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

const { width } = Dimensions.get('window');
const CELL_COUNT = 4;

const OTPVerify = ({ route, navigation }) => {
  const { phone } = route.params || { phone: '+91 900 2134 333' };
  const [value, setValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleVerify = () => {
    if (value.length === CELL_COUNT) {
      // Navigate to EnterName screen
      navigation.navigate('EnterName');
    } else {
      alert('Please enter the complete OTP');
    }
  };

  const handleResendCode = () => {
    if (timeLeft === 0) {
      setTimeLeft(60);
      // Add your resend OTP logic here
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/otp-page.jpg')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Please enter the 4 digit verification code that is send to you at{' '}
        <Text style={styles.phone}>{phone}</Text>
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity onPress={handleResendCode} disabled={timeLeft > 0}>
        <Text style={styles.timerText}>
          Don't receive code?{' '}
          <Text style={[styles.timer, timeLeft === 0 && styles.resendEnabled]}>
            {timeLeft > 0 ? `${timeLeft} Sec` : 'Resend'}
          </Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 100,
  },
  image: {
    width: width * 0.6,
    height: 180,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  phone: {
    color: '#7E66FF',
    fontWeight: '600',
  },
  codeFieldRoot: {
    marginBottom: 20,
    justifyContent: 'center',
  },
  cell: {
    width: 60,
    height: 60,
    lineHeight: 55,
    fontSize: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    textAlign: 'center',
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 24,
    color: '#000',
  },
  focusCell: {
    borderColor: '#7E66FF',
  },
  timerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999',
    marginBottom: 30,
  },
  timer: {
    color: '#7E66FF',
    fontWeight: '600',
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
  resendEnabled: {
    color: '#7E66FF',
    textDecorationLine: 'underline',
  },
});

export default OTPVerify;
