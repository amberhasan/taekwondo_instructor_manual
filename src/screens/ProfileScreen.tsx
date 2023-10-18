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
// import storage from '@react-native-firebase/storage';

const ProfileScreen = () => {
  const user = auth().currentUser;
  const [profilePicture, setProfilePicture] = useState(true); //  TODO: this will hold real image path

  const uploadImage = async (filename: string, uploadUri: string) => {
    // const filePath = `profile/photos/${filename}`;
    // const task = storage().ref(filePath).putFile(uploadUri);
    // try {
    //   await task;
    // } catch (e) {
    //   console.error(e);
    // }
    // const url = await storage().ref(filePath).getDownloadURL();
    // Alert.alert(
    //   'Photo uploaded!',
    //   'Your photo has been uploaded to Firebase Cloud Storage!',
    // );
    // return url;
  };

  const defaultProfilePic = require('../assets/images/profile_pic_default.png');

  const dummyData = {
    location: 'San Francisco, CA',
    dateOfBirth: 'January 1, 1990',
    joinedDate: 'May 15, 2020',
    bio: 'Just a random user exploring the vast world of mobile apps.',
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

  const deleteUser = async () => {
    console.log('Deleting user');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{user?.displayName}</Text>
      </View>
      <TouchableOpacity
        disabled // later we will enable it
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
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Location:</Text>
        <Text style={styles.infoText}>San Francisco, CA</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Date of Birth:</Text>
        <Text style={styles.infoText}>January 1, 1990</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Joined:</Text>
        <Text style={styles.infoText}>May 15, 2020</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Bio:</Text>
        <Text style={styles.infoText}>
          Just a random user exploring the vast world of mobile apps.
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleSignOut}
        style={[styles.button, styles.signOutButton]}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={deleteUser}
        style={[styles.button, styles.deleteButton]}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Lighter background
    paddingHorizontal: 20,
    paddingTop: 20, // Reduced the top padding
  },
  header: {
    marginBottom: 10, // Reduced margin below the header
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center',
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 15, // Reduced margin below the avatar
    borderWidth: 2,
    borderColor: '#E1E1E1',
    borderRadius: 70,
    overflow: 'hidden',
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
  },
  userEmail: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
    alignSelf: 'center',
  },
  infoSection: {
    flexDirection: 'row',
    marginVertical: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  infoLabel: {
    fontWeight: '600',
    color: '#555',
    flex: 1,
  },
  infoText: {
    color: '#777',
    fontSize: 16,
    flex: 2,
    textAlign: 'right',
  },
  button: {
    //backgroundColor: '#FF6347',
    padding: 12,
    borderRadius: 25,
    paddingHorizontal: 30,
    marginTop: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

  deleteButton: {
    backgroundColor: 'red',
  },
  signOutButton: {
    backgroundColor: '#FF6347',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileScreen;
