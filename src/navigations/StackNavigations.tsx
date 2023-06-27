import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types';
import {LandingScreen, LoginScreen, CreateProfileScreen} from '../screens';
import DrawerNavigation from './DrawerNavigation';


const RootStack = createStackNavigator<RootStackParamList>();
const StackNavigations = () => {
  return (
    <RootStack.Navigator initialRouteName="Landing">
      <RootStack.Screen
        component={LandingScreen}
        name="Landing"
        options={{headerShown: false}}
      />
      <RootStack.Screen
        component={LoginScreen}
        name="Login"
        options={{headerShown: false}}
      />
      <RootStack.Screen
        component={CreateProfileScreen}
        name="CreateProfile"
        options={{headerShown: true}}
      />
      <RootStack.Screen
        component={DrawerNavigation}
        name="Home"
        options={{headerShown: false}}
      />
      
    </RootStack.Navigator>
  );
};
export default StackNavigations;
