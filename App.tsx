import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import DetailsScreen from './src/screens/DetailsScreen';
import ListScreen from './src/screens/ListScreen';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PalgwaeData from './src/data/PalgwaeData';
import TaegeukData from './src/data/TaegeukData';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TaegeukTab = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName = 'mountain-sun';
        if (route.name === 'Taegeuk Forms') {
          iconName = 'karate';
        } else if (route.name === 'Palgwae Forms') {
          iconName = 'earth';
        }
        return (
          <MaterialCommunityIcons name={iconName} size={size} color={color} />
        );
      },
      tabBarLabelStyle: {
        fontSize: 15,
        fontWeight: 'bold',
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: '#f0f0f0',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
      },
      tabBarItemStyle: {
        borderRightWidth: 1,
        borderRightColor: '#ccc',
      },
    })}>
    <Tab.Screen
      initialParams={{forms: TaegeukData, formType: 'taegeuk'}}
      name="Taegeuk Forms"
      component={ListScreen}
      options={{tabBarLabel: 'Taegeuk'}}
    />
    <Tab.Screen
      initialParams={{forms: PalgwaeData, formType: 'palgwae'}}
      name="Palgwae Forms"
      component={ListScreen}
      options={{tabBarLabel: 'Palgwae'}}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  return (
    <Provider store={configureStore()}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={TaegeukTab}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DetailsScreen"
              component={DetailsScreen}
              options={({route}) => ({
                title: `${
                  route.params.formType.charAt(0).toUpperCase() +
                  route.params.formType.slice(1)
                } ${route.params.selectedFormIndex + 1}`,

                headerStyle: {
                  backgroundColor: '#f0f0f0', // Customize header background color
                },
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default AppNavigator;
