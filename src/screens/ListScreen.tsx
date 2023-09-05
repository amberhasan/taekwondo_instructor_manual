import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
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

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => handleRowPress(index)}
      style={[styles.button, {backgroundColor: generateRandomColor()}]}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.titleKorean}>({item.titleKorean})</Text>
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
  button: {
    width: width / 2 - 10,
    height: height / 5 - 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'stretch',
    margin: 5,
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
});

export default ListScreen;
