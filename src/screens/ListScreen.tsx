import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';

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
    <TouchableHighlight
      underlayColor="#3498db" // Change this color to match your design
      onPress={() => handleRowPress(index)}
      style={styles.row}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={forms}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()} // Use a unique keyExtractor
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Adjust the marginTop value as needed
  },
  row: {
    marginBottom: 10,
    backgroundColor: '#3498db', // Change this color to match your design
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Change this color to match your design
  },
});

export default ListScreen;
