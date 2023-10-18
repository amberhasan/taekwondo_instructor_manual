import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface NavigationComponentProps {
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  canGoBack: boolean;
  canSubmit: boolean;
}

const NavigationComponent: React.FC<NavigationComponentProps> = ({
  onPrev,
  onNext,
  onSubmit,
  canGoBack,
  canSubmit,
}) => {
  return (
    <View style={styles.navigationButtons}>
      {canGoBack && (
        <TouchableOpacity
          style={[styles.button, styles.prevButton]}
          onPress={onPrev}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
      )}
      {canSubmit ? (
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={onSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={onNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navigationButtons: {
    flexDirection: 'row',
    backgroundColor: '#eef2f7',
    justifyContent: 'space-between',
    padding: 12,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    elevation: 3,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  prevButton: {
    backgroundColor: '#c1c7d0',
  },
  nextButton: {
    backgroundColor: '#007BFF',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
});

export default NavigationComponent;
