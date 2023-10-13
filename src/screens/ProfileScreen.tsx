import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const ProfileScreen = () => {
  const user = auth().currentUser;
  const [profilePicture, setProfilePicture] = useState(user.photoURL);

  const uploadImage = async (filename: string, uploadUri: string) => {
    const filePath = `profile/photos/${filename}`;
    const task = storage().ref(filePath).putFile(uploadUri);

    try {
      await task;
    } catch (e) {
      console.error(e);
    }

    const url = await storage().ref(filePath).getDownloadURL();
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!',
    );
    return url;
  };

  const defaultProfilePic = require('../assets/images/profile_pic_default.png');

  const handleProfilePictureUpload = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });
      if (result.didCancel) {
        return;
      }

      const fileName = result.assets[0].fileName;
      const uri = result.assets[0].uri || '';
      const url = await uploadImage(String(new Date().getTime()), uri);
      auth().currentUser?.updateProfile({
        displayName: user?.displayName,
        photoURL: url,
      });
      setProfilePicture(url);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{user?.displayName}</Text>
      </View>
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={handleProfilePictureUpload}>
        {profilePicture ? (
          <Image source={defaultProfilePic} style={styles.profilePicture} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>Tap to Upload</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.userEmail}>{user?.email}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    marginBottom: 30,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 130,
    height: 130,
    backgroundColor: '#E1E1E1',
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#555',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profilePicture: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#777',
    marginBottom: 30,
  },
  signOutButton: {
    backgroundColor: '#FF6347', // Tomato color for visual appeal
    padding: 12,
    borderRadius: 25,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  signOutButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
