import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import PalgwaeListScreen from './src/screens/PalgwaeListScreen';
import TaegeukDetailsScreen from './src/screens/TaegeukDetailsScreen';
import TaegeukListScreen from './src/screens/TaegeukListScreen';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TaegeukTab = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName = 'tune-vertical';
        // if (route.name === 'Taegeuk Forms') {
        //   iconName = 'tune-vertical';
        // } else if (route.name === 'Palgwae Forms') {
        //   iconName = 'tune-variant';
        // }
        return (
          <MaterialCommunityIcons
            name={'tune-vertical'}
            size={size}
            color={color}
          />
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
            headerStyle: {
              backgroundColor: '#f0f0f0', // Customize header background color
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
