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
      underlayColor="#3498db"
      onPress={() => handleRowPress(index)}
      style={styles.row}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.titleContainer}>
          <Text style={styles.titleKorean}>{item.titleKorean}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={forms}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  row: {
    marginBottom: 10,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  titleContainer: {
    alignItems: 'center', // Center the Korean title
  },
  titleKorean: {
    fontSize: 14,
    color: '#a5a5a5', // A more subtle color for the Korean title
  },
});

export default ListScreen;
