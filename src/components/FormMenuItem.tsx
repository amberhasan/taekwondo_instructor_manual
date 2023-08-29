import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const FormMenuItem = ({item, handleRowPress}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handleRowPress(item)}>
      <Text style={styles.buttonText}>{item}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 20, // Added horizontal padding
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FormMenuItem;
