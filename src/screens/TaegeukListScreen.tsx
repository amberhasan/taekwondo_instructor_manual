import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import FormMenuItem from '../components/FormMenuItem';

const TaegeukListScreen = ({navigation}) => {
  const taegeukForms = [
    'Taegeuk 1 (Il-Jang)',
    'Taegeuk 2 (I-Jang)',
    'Taegeuk 3 (Sam-Jang)',
    'Taegeuk 4 (Sa-Jang)',
    'Taegeuk 5 (Oh-Jang)',
    'Taegeuk 6 (Yook-Jang)',
    'Taegeuk 7 (Chil-Jang)',
    'Taegeuk 8 (Pal-Jang)',
  ];

  const handleRowPress = formIndex => {
    navigation.navigate('TaegeukDetail', {selectedFormIndex: formIndex + 1});
  };

  const renderItem = ({item, index}) => (
    <FormMenuItem item={item} handleRowPress={() => handleRowPress(index)} />
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
