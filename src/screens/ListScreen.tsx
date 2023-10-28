import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Card from '../components/Card'; // Import the Card component
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
const {height, width} = Dimensions.get('window');
import {setTaegeukData, setPalgwaeData, setLoading} from '../actions';

const ListScreen = ({navigation, route}) => {
  const formType = route.params.formType;
  const taegeukData = useSelector(state => state.taegeukMoves.taegeukData);
  const palgwaeData = useSelector(state => state.palgwaeMoves.palgwaeData);
  const taegeukDataLoading = useSelector(state => state.taegeukMoves.loading);

  // console.log('taegeukData', taegeukData);
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

  const handleRowPress = formIndex => {
    navigation.navigate('DetailsScreen', {
      selectedFormIndex: formIndex,
      formType: formType,
    });
  };

  const renderItem = ({item, index}) => (
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
