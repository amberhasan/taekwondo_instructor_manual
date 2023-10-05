import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const ProfileScreen = () => {
  const user = auth().currentUser;
  const [profilePicture, setProfilePicture] = useState(user.photoURL);
  const [description, setDescription] = useState('');

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

      <TextInput
        style={styles.descriptionInput}
        placeholder="Add a description about yourself"
        value={description}
        onChangeText={text => setDescription(text)}
        multiline={true}
      />

      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
    paddingTop: 30,
  },
  avatarContainer: {
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
  descriptionInput: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  signOutButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
