import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Card from '../components/Card'; // Import the Card component
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import {setTaegeukData, setPalgwaeData, setLoading} from '../actions';
import {Form, FormItem, PalgwaeState} from '../types';
import {RootState} from '../reducers/rootReducer';

const {height, width} = Dimensions.get('window');
const ListScreen = ({navigation, route}) => {
  const formType = route.params.formType;
  const taegeukData = useSelector(
    (state: RootState) => state.taegeuk.taegeukData,
  );
  const palgwaeData = useSelector(
    (state: RootState) => state.palgwae.palgwaeData,
  );
  const taegeukDataLoading = useSelector(
    (state: RootState) => state.taegeuk.loading,
  );
  const dispatch = useDispatch();

  const getData = async () => {
    const formCollection = await firestore()
      .collection(formType == 'taegeuk' ? 'taegeukForms' : 'palgwaeForms')
      .get();
    let forms = formCollection.docs.map(doc => doc.data());
    // console.log('We got data and now dispatching an action');
    // action -> reducer -> state -> render
    dispatch(
      formType == 'taegeuk' ? setTaegeukData(forms) : setPalgwaeData(forms),
    );
    dispatch(setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRowPress = (formIndex: number) => {
    navigation.navigate('DetailsScreen', {
      selectedFormIndex: formIndex,
      formType: formType,
    });
  };

  const renderItem = ({item, index}: FormItem) => (
    <Card item={item} index={index} handleRowPress={handleRowPress} />
  );
  const flatListData = formType == 'taegeuk' ? taegeukData : palgwaeData;

  if (taegeukDataLoading) {
    return <ActivityIndicator size={'large'} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={flatListData}
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
