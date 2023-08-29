import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import FormMenuItem from '../components/FormMenuItem';

const TaegeukListScreen = ({navigation}) => {
  const taegeukForms = [
    'Taegeuk 1',
    'Taegeuk 2',
    'Taegeuk 3',
    'Taegeuk 4',
    'Taegeuk 5',
    'Taegeuk 6',
    'Taegeuk 7',
    'Taegeuk 8',
  ];

  const handleRowPress = form => {
    navigation.navigate('TaegeukDetail', {selectedForm: form});
  };

  const renderItem = ({item}) => (
    <FormMenuItem item={item} handleRowPress={handleRowPress} />
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
    marginTop: 20, // Adjust the marginTop value as needed
  },
});

export default TaegeukListScreen;
