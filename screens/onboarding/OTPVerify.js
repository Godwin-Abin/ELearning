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

  // Format phone number as 3 4 3 (e.g., 123 4567 890)
  const formatPhoneNumber = (num) => {
    // Remove all non-digit characters
    const digits = num.replace(/\D/g, '');
    if (digits.length === 10) {
      // If number is 10 digits (e.g., 9002134333)
      return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
    } else if (digits.length === 11 && digits.startsWith('0')) {
      // If number is 11 digits and starts with 0 (e.g., 09002134333)
      return `${digits.slice(1, 4)} ${digits.slice(4, 8)} ${digits.slice(8)}`;
    } else if (digits.length === 12 && digits.startsWith('91')) {
      // If number is 12 digits and starts with country code (e.g., 919002134333)
      return `${digits.slice(2, 5)} ${digits.slice(5, 9)} ${digits.slice(9)}`;
    } else if (digits.length === 13 && digits.startsWith('91')) {
      // If number is 13 digits and starts with +91 (e.g., 919002134333)
      return `${digits.slice(3, 6)} ${digits.slice(6, 10)} ${digits.slice(10)}`;
    }
    // Fallback: return as is
    return num;
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
        <Text style={styles.phone}>+91 </Text>
        <Text style={styles.phone}>{formatPhoneNumber(phone)}</Text>
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
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
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
    width: 90,
    height: 90,
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
    fontSize: 30,
    color: '#000',
    fontWeight: '500',
  },
  focusCell: {
    borderColor: '#7E66FF',
  },
  timerText: {
    textAlign: 'right',
    fontSize: 14,
    color: '#999',
    marginBottom: 50,
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
