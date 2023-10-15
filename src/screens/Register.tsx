import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const Register = ({navigation}) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      if (email && password) {
        await auth().createUserWithEmailAndPassword(email, password);
        await auth().currentUser?.updateProfile({
          displayName,
        });
      } else {
        Alert.alert('Error', 'Email and password is required');
      }
    } catch (err) {
      console.error('error', err);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Display Name"
          placeholderTextColor="#aaa"
          onChangeText={text => setDisplayName(text)}
          value={displayName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          onChangeText={text => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          value={password}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonSecondary]}
        onPress={handleLogin}>
        <Text style={styles.buttonTextSecondary}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A11CB',
  },
  title: {
    fontSize: 28,
    marginBottom: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '85%',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ffffff33',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
  },
  button: {
    width: '80%',
    height: 45,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6A11CB',
  },
  buttonTextSecondary: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});

export default Register;
