import * as React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import PalgwaeListScreen from './src/screens/PalgwaeListScreen';
import TaegeukDetailsScreen from './src/screens/TaegeukDetailsScreen';
import TaegeukListScreen from './src/screens/TaegeukListScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TaegeukTab = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="TaegeukList"
      component={TaegeukListScreen}
      options={{tabBarLabel: 'Taegeuk'}} // Change tab label to "Taegeuk"
    />
    <Tab.Screen
      name="PalgwaeList"
      component={PalgwaeListScreen}
      options={{tabBarLabel: 'Palgwae'}} // Change tab label to "Palgwae"
    />
    {/* Add other tab screens if needed */}
  </Tab.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TaegeukTab}
          options={{headerShown: false}} // Hide the header for the home screen
        />
        <Stack.Screen
          name="TaegeukList"
          component={TaegeukListScreen}
          options={{title: 'Taegeuk Forms'}} // Change header title to "Taegeuk Forms"
        />
        <Stack.Screen
          name="PalgwaeList"
          component={PalgwaeListScreen}
          options={{title: 'Palgwae Forms'}} // Change header title to "Palgwae Forms"
        />
        <Stack.Screen
          name="TaegeukDetail"
          component={TaegeukDetailsScreen}
          options={{title: 'Taegeuk Detail'}} // Customize the header title
        />
        {/* Add other shared stack screens if needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
