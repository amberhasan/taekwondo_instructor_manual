import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import FormMenuItem from '../components/FormMenuItem';

const TaegeukListScreen = ({navigation, route}) => {
  console.log(route.params.forms);
  const forms = route.params.forms;
  const handleRowPress = formIndex => {
    navigation.navigate('TaegeukDetail', {selectedFormIndex: formIndex});
    console.log(formIndex);
  };

  const renderItem = ({item, index}) => (
    <FormMenuItem item={item} handleRowPress={() => handleRowPress(index)} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={forms}
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
