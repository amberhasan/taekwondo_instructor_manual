import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import auth from '@react-native-firebase/auth';
import Card from '../components/Card'; // Import the Card component
import firestore from '@react-native-firebase/firestore';
const {height, width} = Dimensions.get('window');

const ListScreen = ({navigation, route}) => {
  let forms = route.params.forms;

  const formType = route.params.formType;
  const [data, setData] = useState([]);

  const getData = async () => {
    if (formType == 'taegeuk') {
      const taegeukCollection = await firestore()
        .collection('taegeukForms')
        .get();
      forms = taegeukCollection.docs.map(doc => doc.data());
    } else {
      const palgwaeCollection = await firestore()
        .collection('palgwaeForms')
        .get();
      forms = palgwaeCollection.docs.map(doc => doc.data());
    }
    setData(forms);
    console.log('forms', forms);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRowPress = formIndex => {
    navigation.navigate('DetailsScreen', {
      selectedFormIndex: formIndex,
      formType: formType,
    });
  };

  const renderItem = ({item, index}) => (
    <Card item={item} index={index} handleRowPress={handleRowPress} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.contentContainer}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  // Add your other styles here
});

export default ListScreen;
