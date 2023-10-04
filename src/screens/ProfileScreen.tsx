import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const ProfileScreen = () => {
  const user = auth().currentUser;
  console.log('user', user.photoURL);
  const [profilePicture, setProfilePicture] = useState(user.photoURL);

  const uploadImage = async (filename: string, uploadUri: string) => {
    // const filename = uri.substring(uri.lastIndexOf('/') + 1);
    // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    // setUploading(true);
    // setTransferred(0);
    const filePath = `profile/photos/${filename}`;
    const task = storage().ref(filePath).putFile(uploadUri);
    // set progress state
    // task.on('state_changed', snapshot => {
    //   setTransferred(
    //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
    //   );
    // });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }

    const url = storage().ref(filePath).getDownloadURL();
    // setUploading(false);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!',
    );
    return url;
    // setImage(null);
  };

  const handleProfilePictureUpload = async () => {
    console.log('image picker');
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });
      if (result.didCancel) {
        // user cancelled the image picker
        return;
      }

      console.log('result', result);
      const fileName = result.assets[0].fileName;
      const uri = result.assets[0].uri || '';
      const url = await uploadImage(String(new Date().getTime()), uri);
      auth().currentUser?.updateProfile({
        displayName: user?.displayName,
        photoURL: url,
      });
      setProfilePicture(url);
      console.log('url', url);
    } catch (err) {
      console.error(err);
    }
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
