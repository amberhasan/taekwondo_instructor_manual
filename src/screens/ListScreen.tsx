import React, {useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import {FontAwesome} from '@expo/vector-icons'; // Import FontAwesome for the star icon

const {height, width} = Dimensions.get('window');

function generateRandomColor() {
  // Generate random values for red, green, and blue channels
  const red = Math.floor(Math.random() * 128); // Limiting to a darker range (0-127)
  const green = Math.floor(Math.random() * 128); // Limiting to a darker range (0-127)
  const blue = Math.floor(Math.random() * 128); // Limiting to a darker range (0-127)

  // Create a CSS color string in the format "rgb(r, g, b)"
  const randomDarkColor = `rgb(${red}, ${green}, ${blue})`;

  return randomDarkColor;
}

const ListScreen = ({navigation, route}) => {
  const forms = route.params.forms;
  const formType = route.params.formType;

  const handleRowPress = formIndex => {
    navigation.navigate('DetailsScreen', {
      selectedFormIndex: formIndex,
      formType: formType,
    });
  };

  const [favorites, setFavorites] = useState([]); // State to track favorites

  const toggleFavorite = formIndex => {
    // Check if the formIndex is in the favorites array
    if (favorites.includes(formIndex)) {
      // If it's already a favorite, remove it
      setFavorites(favorites.filter(index => index !== formIndex));
    } else {
      // If it's not a favorite, add it
      setFavorites([...favorites, formIndex]);
      console.log('adding', formIndex);
    }
    console.log('Favorited Forms:', favorites);
  };

  const isFavorite = formIndex => favorites.includes(formIndex); // Helper function to check if an item is a favorite

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => handleRowPress(index)}
      style={[styles.button, {backgroundColor: generateRandomColor()}]}>
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.titleKorean}>({item.titleKorean})</Text>
        </View>
        <TouchableOpacity
          onPress={() => toggleFavorite(index)}
          style={styles.favoriteIcon}>
          <FontAwesome
            name={isFavorite(index) ? 'star' : 'star-o'}
            size={24}
            color={isFavorite(index) ? 'gold' : '#ccc'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={forms}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.contentContainer}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row', // Row layout for item container
    alignItems: 'center', // Center vertically within the item
    justifyContent: 'space-between', // Add space between text and star icon
    width: width / 2 - 50, // Adjust width based on your design
    margin: 10,
  },
  button: {
    borderRadius: 10,
    padding: 10, // Adjust padding for better spacing
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  titleKorean: {
    fontSize: 14,
    color: '#a5a5a5',
    textAlign: 'center',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 5, // Adjust top position for better alignment
    right: 5, // Adjust right position for better alignment
  },
});

export default ListScreen;
