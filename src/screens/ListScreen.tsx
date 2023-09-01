import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity, Text} from 'react-native';

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
      style={styles.button}>
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  button: {
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 40, // Adjust this value for wider buttons
    borderRadius: 10,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignSelf: 'stretch',
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
