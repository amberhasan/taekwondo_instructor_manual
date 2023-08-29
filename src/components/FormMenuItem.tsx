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
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default FormMenuItem;
