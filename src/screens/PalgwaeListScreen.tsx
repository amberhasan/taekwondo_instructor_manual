import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import FormMenuItem from '../components/FormMenuItem';

const PalgwaeListScreen = ({navigation}) => {
  const palgwaeForms = [
    'Palgwae 1 (Il-Jang)',
    'Palgwae 2 (I-Jang)',
    'Palgwae 3 (Sam-Jang)',
    'Palgwae 4 (Sa-Jang)',
    'Palgwae 5 (Oh-Jang)',
    'Palgwae 6 (Yook-Jang)',
    'Palgwae 7 (Chil-Jang)',
    'Palgwae 8 (Pal-Jang)',
  ];

  const handleRowPress = form => {
    navigation.navigate('TaegeukDetail', {selectedFormIndex: form});
  };

  const renderItem = ({item}) => (
    <FormMenuItem item={item} handleRowPress={handleRowPress} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={palgwaeForms}
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
    marginTop: 20, // Adjust the marginTop value as needed
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
