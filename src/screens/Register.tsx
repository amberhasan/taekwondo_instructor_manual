import React, {useState} from 'react';
import {Text, View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

const Register = ({navigation}) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // You can add your registration logic here
    // For simplicity, we'll just log the entered data for now
    try {
      if (email && password) {
        const user = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'Email and password is required');
      }
    } catch (err) {
      console.error('error', err);
    }

    console.log('Display Name:', displayName);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleLogin = () => {
    // You can add your authentication logic here
    // For simplicity, we'll just log the username and password for now
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Display Name"
        onChangeText={text => setDisplayName(text)}
        value={displayName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default Register;
