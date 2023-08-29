import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';

const PalgwaeListScreen = ({navigation}) => {
  const taegeukForms = [
    'Palgwae 1',
    'Palgwae 2',
    'Palgwae 3',
    'Palgwae 4',
    'Palgwae 5',
    'Palgwae 6',
    'Palgwae 7',
    'Palgwae 8',
  ];

  const handleRowPress = form => {
    navigation.navigate('TaegeukDetail', {selectedForm: form});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handleRowPress(item)}>
      <Text style={styles.buttonText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={taegeukForms}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#3498db',
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default PalgwaeListScreen;
