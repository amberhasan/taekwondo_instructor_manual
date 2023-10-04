import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {
  const user = auth().currentUser;
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureUpload = () => {
    // Implement logic to open a file picker or camera access for image upload
    // Once the user selects/upload a picture, update the profilePicture state
  };

  const handleSignOut = async () => {
    try {
      await auth().signOut(); // Sign out the user using your authentication library
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={handleProfilePictureUpload}>
        {profilePicture ? (
          <Image source={{uri: profilePicture}} style={styles.profilePicture} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>Upload Picture</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Email:</Text>
        <Text style={styles.fieldValue}>{user?.email}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Username:</Text>
        <Text style={styles.fieldValue}>{user?.displayName}</Text>
      </View>

      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Move content to the top
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20, // Added padding on the sides
    paddingTop: 30, // Added padding at the top
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333', // Darker text color
  },
  avatarContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: '#E1E1E1',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#555',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fieldLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  fieldValue: {
    flex: 2,
    fontSize: 16,
    color: '#555',
  },
  signOutButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
  },
  signOutButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
