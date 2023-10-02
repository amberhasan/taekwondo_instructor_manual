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
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import auth from '@react-native-firebase/auth';
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: true,
        }}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
        }}
      />
    </AuthStack.Navigator>
  );
};

const HomeStackNavigator = ({navigation}) => {
  // Function to open the sidebar when the button is pressed
  const openSidebar = () => {
    navigation.openDrawer();
  };
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={TaegeukTab}
        options={{
          headerShown: true,
          headerLeft: () => (
            <MaterialCommunityIcons
              name="menu"
              size={30}
              style={{marginLeft: 10}}
              onPress={openSidebar}
            />
          ),
        }}
      />
      <HomeStack.Screen
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
    </HomeStack.Navigator>
  );
};

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
      options={{headerShown: false, tabBarLabel: 'Taegeuk'}}
    />
    <Tab.Screen
      initialParams={{forms: PalgwaeData, formType: 'palgwae'}}
      name="Palgwae Forms"
      component={ListScreen}
      options={{headerShown: false, tabBarLabel: 'Palgwae'}}
    />
  </Tab.Navigator>
);

const AppNavigator = ({navigation}) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  // Handle user state changes
  function onAuthStateChanged(user) {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }

  React.useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged); //reference to the listener, subscriber is a function //mount
    return () => {
      unsubscribe();
    }; // unsubscribe on unmount
  }, []);
  return (
    <Provider store={configureStore()}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {isAuthenticated ? (
              <Stack.Screen
                name={'HomeStackNavigator'}
                component={HomeStackNavigator}
              />
            ) : (
              <Stack.Screen
                name={'AuthStackNavigator'}
                component={AuthStackNavigator}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default AppNavigator;
