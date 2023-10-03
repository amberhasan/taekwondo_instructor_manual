import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProfileScreen = ({displayName, email}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Name: {displayName}</Text>
      <Text>Email: {email}</Text>
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
});

export default ProfileScreen;
