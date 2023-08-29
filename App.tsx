import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import PalgwaeListScreen from './src/screens/PalgwaeListScreen';
import TaegeukDetailsScreen from './src/screens/TaegeukDetailsScreen';
import TaegeukListScreen from './src/screens/TaegeukListScreen';
import {createStackNavigator} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TaegeukTab = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Taegeuk Forms"
      component={TaegeukListScreen}
      options={{tabBarLabel: 'Taegeuk'}}
    />
    <Tab.Screen
      name="Palgwae Forms"
      component={PalgwaeListScreen}
      options={{tabBarLabel: 'Palgwae'}}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TaegeukTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TaegeukDetail"
          component={TaegeukDetailsScreen}
          options={({route}) => ({
            title: `Taegeuk ${route.params.selectedFormIndex}`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
